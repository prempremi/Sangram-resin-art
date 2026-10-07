import {
  del,
  get,
  issueSignedToken,
  list,
  presignUrl,
  put,
} from '@vercel/blob';
import crypto from 'node:crypto';

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  caption: string;
  isPrivate: boolean;
  createdAt: string;
  uploadedBy?: string;
  blobPath?: string;
  contentType?: string;
};

type JwtPayload = {
  role?: string;
  exp?: number;
};

const META_PREFIX = 'gallery/meta/';
const IMAGE_PREFIX = 'gallery/images/';

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

/* ---------------------------------------------------------
   JWT AUTH
--------------------------------------------------------- */

function base64UrlDecode(value: string): string {
  const normalized =
    value.replace(/-/g, '+').replace(/_/g, '/') +
    '='.repeat((4 - (value.length % 4)) % 4);

  return Buffer.from(normalized, 'base64').toString('utf8');
}

function verifyAdminToken(
  authorization: string | null
): JwtPayload | null {
  if (!authorization) return null;

  if (!authorization.startsWith('Bearer ')) {
    return null;
  }

  const token = authorization.slice(7).trim();

  const parts = token.split('.');

  if (parts.length !== 3) {
    return null;
  }

  const [
    encodedHeader,
    encodedPayload,
    signature,
  ] = parts;

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error(
      'JWT_SECRET environment variable is missing'
    );
    return null;
  }

  const expectedSignature =
    crypto
      .createHmac('sha256', secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      base64UrlDecode(encodedPayload)
    ) as JwtPayload;

    if (payload.role !== 'admin') {
      return null;
    }

    if (
      payload.exp &&
      Date.now() / 1000 >= payload.exp
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function requireAdmin(request: Request): JwtPayload {
  const payload = verifyAdminToken(
    request.headers.get('authorization')
  );

  if (!payload) {
    throw new Response(
      JSON.stringify({
        error: 'Unauthorized',
        message: 'Admin authentication required',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return payload;
}

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

function createId(): string {
  return `photo_${Date.now()}_${crypto
    .randomBytes(5)
    .toString('hex')}`;
}

function safeExtension(contentType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
    'image/heic': 'heic',
    'image/heif': 'heif',
  };

  return map[contentType] || 'jpg';
}

function isImageType(contentType: string): boolean {
  return [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/heic',
    'image/heif',
  ].includes(contentType);
}

async function readMetadata(
  pathname: string
): Promise<GalleryItem | null> {
  try {
    const result = await get(pathname, {
      access: 'private',
      useCache: false,
    });

    if (!result) {
      return null;
    }

    const text = await new Response(
      result.stream
    ).text();

    return JSON.parse(text) as GalleryItem;
  } catch (error) {
    console.error(
      `Failed to read metadata: ${pathname}`,
      error
    );

    return null;
  }
}

async function saveMetadata(
  item: GalleryItem
): Promise<void> {
  await put(
    `${META_PREFIX}${item.id}.json`,
    JSON.stringify(item),
    {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    }
  );
}

async function getAllMetadata(): Promise<GalleryItem[]> {
  const items: GalleryItem[] = [];

  let cursor: string | undefined;

  do {
    const result = await list({
      prefix: META_PREFIX,
      cursor,
    });

    for (const blob of result.blobs) {
      const item = await readMetadata(
        blob.pathname
      );

      if (item) {
        items.push(item);
      }
    }

    cursor = result.hasMore
      ? result.cursor
      : undefined;
  } while (cursor);

  return items.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

async function getMetadataById(
  id: string
): Promise<GalleryItem | null> {
  return readMetadata(
    `${META_PREFIX}${id}.json`
  );
}

/* ---------------------------------------------------------
   PRIVATE IMAGE SIGNED URL
--------------------------------------------------------- */

const result = await presignUrl(token, {
  pathname,
  access: 'private',
  operation: 'get',
});
    useCache: false,
  });

  return result.presignedUrl;
}

async function addSignedImageUrl(
  item: GalleryItem
): Promise<GalleryItem> {
  if (!item.blobPath) {
    return item;
  }

  try {
    return {
      ...item,
      image: await getPrivateImageUrl(
        item.blobPath
      ),
    };
  } catch (error) {
    console.error(
      'Failed to create image URL',
      error
    );

    return item;
  }
}

/* ---------------------------------------------------------
   DIRECT LARGE-FILE UPLOAD URL
--------------------------------------------------------- */

async function createUploadUrl(
  request: Request
) {
  requireAdmin(request);

  const body = await request.json();

  const contentType =
    typeof body.contentType === 'string'
      ? body.contentType
      : '';

  const originalName =
    typeof body.filename === 'string'
      ? body.filename
      : 'image';

  if (!isImageType(contentType)) {
    return json(
      {
        error:
          'Only image files are allowed.',
      },
      400
    );
  }

  const id = createId();

  const extension =
    safeExtension(contentType);

  const pathname =
    `${IMAGE_PREFIX}${id}.${extension}`;

  /*
   * Browser will upload directly to Vercel Blob
   * using this short-lived signed PUT URL.
   *
   * The BLOB_READ_WRITE_TOKEN never reaches
   * the browser.
   */

  const token = await issueSignedToken({
    pathname,
access: 'private',
    operations: ['put'],
  });

const result = await presignUrl(token, {
  pathname,
  access: 'private',
  operation: 'put',
  validUntil: Date.now() + 15 * 60 * 1000,
});

  return json({
    success: true,
    id,
    pathname,
    filename: originalName,
    contentType,
    uploadUrl: result.presignedUrl,
  });
}

/* ---------------------------------------------------------
   SAVE GALLERY METADATA AFTER DIRECT UPLOAD
--------------------------------------------------------- */

async function saveUploadedItem(
  request: Request
) {
  requireAdmin(request);

  const body = await request.json();

  const id =
    typeof body.id === 'string'
      ? body.id
      : '';

  const pathname =
    typeof body.pathname === 'string'
      ? body.pathname
      : '';

  if (!id || !pathname) {
    return json(
      {
        error:
          'Upload ID or pathname missing.',
      },
      400
    );
  }

  if (!pathname.startsWith(IMAGE_PREFIX)) {
    return json(
      {
        error: 'Invalid Blob pathname.',
      },
      400
    );
  }

  const item: GalleryItem = {
    id,

    title:
      typeof body.title === 'string'
        ? body.title
        : 'Untitled',

    category:
      typeof body.category === 'string'
        ? body.category
        : 'resin',

    categoryLabel:
      typeof body.categoryLabel === 'string'
        ? body.categoryLabel
        : 'Resin Art',

    image: '',

    caption:
      typeof body.caption === 'string'
        ? body.caption
        : '',

    isPrivate:
      Boolean(body.isPrivate),

    createdAt:
      typeof body.createdAt === 'string'
        ? body.createdAt
        : new Date().toISOString(),

    uploadedBy:
      typeof body.uploadedBy === 'string'
        ? body.uploadedBy
        : 'Studio Admin',

    blobPath: pathname,

    contentType:
      typeof body.contentType === 'string'
        ? body.contentType
        : undefined,
  };

  /*
   * Verify that the image actually exists
   * before saving metadata.
   */

  const image = await get(
    pathname,
    {
      access: 'private',
      useCache: false,
    }
  );

  if (!image) {
    return json(
      {
        error:
          'Uploaded image was not found in Blob storage.',
      },
      400
    );
  }

  await saveMetadata(item);

  const result =
    await addSignedImageUrl(item);

  return json(result);
}

/* ---------------------------------------------------------
   OLD BASE64 UPLOAD SUPPORT
   --------------------------------------------------------- */

async function uploadBase64(
  request: Request
) {
  requireAdmin(request);

  const body = await request.json();

  if (
    typeof body.image !== 'string'
  ) {
    return json(
      {
        error: 'Image is required.',
      },
      400
    );
  }

  const match =
    body.image.match(
      /^data:([^;]+);base64,(.+)$/
    );

  if (!match) {
    return json(
      {
        error:
          'Invalid base64 image data.',
      },
      400
    );
  }

  const contentType = match[1];

  if (!isImageType(contentType)) {
    return json(
      {
        error:
          'Only image files are allowed.',
      },
      400
    );
  }

  const buffer = Buffer.from(
    match[2],
    'base64'
  );

  /*
   * Safety limit for this fallback route.
   * Large files should use direct upload.
   */

  if (
    buffer.byteLength >
    4 * 1024 * 1024
  ) {
    return json(
      {
        error:
          'Image is too large for base64 upload. Use direct Blob upload.',
      },
      413
    );
  }

  const id = createId();

  const extension =
    safeExtension(contentType);

  const pathname =
    `${IMAGE_PREFIX}${id}.${extension}`;

  await put(
    pathname,
    buffer,
    {
      access: 'private',
      contentType,
      addRandomSuffix: false,
    }
  );

  const item: GalleryItem = {
    id,

    title:
      typeof body.title === 'string'
        ? body.title
        : 'Untitled',

    category:
      typeof body.category === 'string'
        ? body.category
        : 'resin',

    categoryLabel:
      typeof body.categoryLabel === 'string'
        ? body.categoryLabel
        : 'Resin Art',

    image: '',

    caption:
      typeof body.caption === 'string'
        ? body.caption
        : '',

    isPrivate:
      Boolean(body.isPrivate),

    createdAt:
      typeof body.createdAt === 'string'
        ? body.createdAt
        : new Date().toISOString(),

    uploadedBy:
      typeof body.uploadedBy === 'string'
        ? body.uploadedBy
        : 'Studio Admin',

    blobPath: pathname,

    contentType,
  };

  await saveMetadata(item);

  return json(
    await addSignedImageUrl(item)
  );
}

/* ---------------------------------------------------------
   PUBLIC GALLERY
--------------------------------------------------------- */

async function publicGallery() {
  const all =
    await getAllMetadata();

  const visible =
    all.filter(
      (item) =>
        item.isPrivate === false
    );

  const result =
    await Promise.all(
      visible.map(
        (item) =>
          addSignedImageUrl(item)
      )
    );

  return json(result);
}

/* ---------------------------------------------------------
   ADMIN GALLERY
--------------------------------------------------------- */

async function adminGallery(
  request: Request
) {
  requireAdmin(request);

  const all =
    await getAllMetadata();

  const result =
    await Promise.all(
      all.map(
        (item) =>
          addSignedImageUrl(item)
      )
    );

  return json(result);
}

/* ---------------------------------------------------------
   CHANGE VISIBILITY
--------------------------------------------------------- */

async function changeVisibility(
  request: Request,
  id: string
) {
  requireAdmin(request);

  if (!id) {
    return json(
      {
        error:
          'Photo ID missing.',
      },
      400
    );
  }

  const item =
    await getMetadataById(id);

  if (!item) {
    return json(
      {
        error:
          'Photo not found.',
      },
      404
    );
  }

  const body =
    await request.json();

  item.isPrivate =
    Boolean(body.isPrivate);

  await saveMetadata(item);

  return json(
    await addSignedImageUrl(item)
  );
}

/* ---------------------------------------------------------
   DELETE PHOTO
--------------------------------------------------------- */

async function deletePhoto(
  request: Request,
  id: string
) {
  requireAdmin(request);

  if (!id) {
    return json(
      {
        error:
          'Photo ID missing.',
      },
      400
    );
  }

  const item =
    await getMetadataById(id);

  if (!item) {
    return json(
      {
        error:
          'Photo not found.',
      },
      404
    );
  }

  if (item.blobPath) {
    try {
      await del(
        item.blobPath
      );
    } catch (error) {
      console.error(
        'Failed to delete image',
        error
      );
    }
  }

  try {
    await del(
      `${META_PREFIX}${id}.json`
    );
  } catch (error) {
    console.error(
      'Failed to delete metadata',
      error
    );
  }

  return json({
    success: true,
    id,
  });
}

/* ---------------------------------------------------------
   MAIN HANDLER
--------------------------------------------------------- */

export default async function handler(
  request: Request
) {
  try {
    const url =
      new URL(request.url);

    const action =
      url.searchParams.get(
        'action'
      );

    /*
     * GET PUBLIC
     *
     * /api/gallery?action=public
     */

    if (
      request.method === 'GET' &&
      action === 'public'
    ) {
      return publicGallery();
    }

    /*
     * GET ADMIN
     *
     * /api/gallery?action=all
     */

    if (
      request.method === 'GET' &&
      action === 'all'
    ) {
      return adminGallery(
        request
      );
    }

    /*
     * CREATE DIRECT UPLOAD URL
     *
     * POST
     * /api/gallery?action=create-upload
     */

    if (
      request.method === 'POST' &&
      action === 'create-upload'
    ) {
      return createUploadUrl(
        request
      );
    }

    /*
     * SAVE METADATA
     *
     * POST
     * /api/gallery?action=save
     */

    if (
      request.method === 'POST' &&
      action === 'save'
    ) {
      return saveUploadedItem(
        request
      );
    }

    /*
     * OLD BASE64 UPLOAD
     *
     * POST
     * /api/gallery?action=upload
     */

    if (
      request.method === 'POST' &&
      action === 'upload'
    ) {
      return uploadBase64(
        request
      );
    }

    /*
     * VISIBILITY
     *
     * PATCH
     * /api/gallery/:id
     */

    if (
      request.method === 'PATCH'
    ) {
      const parts =
        url.pathname.split('/');

      const id =
        parts[parts.length - 1];

      return changeVisibility(
        request,
        id
      );
    }

    /*
     * DELETE
     *
     * DELETE
     * /api/gallery/:id
     */

    if (
      request.method === 'DELETE'
    ) {
      const parts =
        url.pathname.split('/');

      const id =
        parts[parts.length - 1];

      return deletePhoto(
        request,
        id
      );
    }

    return json(
      {
        error:
          'Invalid gallery request.',
        availableActions: [
          'public',
          'all',
          'create-upload',
          'save',
          'upload',
        ],
      },
      400
    );
  } catch (error) {
    if (
      error instanceof Response
    ) {
      return error;
    }

    console.error(
      'Gallery API error:',
      error
    );

    return json(
      {
        error:
          'Gallery server error.',
      },
      500
    );
  }
}
