import { CustomGalleryItem } from '../types/auth';

const STORAGE_KEY_GALLERY = 'sangram_custom_gallery_photos_v2';

const STUDIO_VAULT_PHOTOS: CustomGalleryItem[] = [
  {
    id: 'vault_item_1',
    title: 'Royal Agate Geode Resin Wall Clock',
    category: 'resin',
    categoryLabel: 'Resin Art',
    image: '/images/resin_wall_art.jpg',
    caption:
      'Private Vault: 36-inch bespoke crystal geode wall clock with crushed quartz crystals and 24K gold foil veins.',
    isPrivate: true,
    createdAt: new Date().toISOString(),
    uploadedBy: 'Studio Admin'
  },
  {
    id: 'vault_item_2',
    title: 'Custom Wedding Varmala Preservation Block',
    category: 'custom-gifts',
    categoryLabel: 'Custom Gifts',
    image: '/images/resin_custom_gifts.jpg',
    caption:
      'Private Vault: Real wedding garland botanical dehydration layout with embedded anniversary vows.',
    isPrivate: true,
    createdAt: new Date().toISOString(),
    uploadedBy: 'Studio Admin'
  }
];

/* ---------------------------------------------------------
   LOCAL FALLBACK
--------------------------------------------------------- */

export const getStoredPhotos = (): CustomGalleryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GALLERY);

    if (!raw) {
      localStorage.setItem(
        STORAGE_KEY_GALLERY,
        JSON.stringify(STUDIO_VAULT_PHOTOS)
      );

      return STUDIO_VAULT_PHOTOS;
    }

    return JSON.parse(raw);
  } catch {
    return STUDIO_VAULT_PHOTOS;
  }
};

export const saveStoredPhotos = (
  photos: CustomGalleryItem[]
) => {
  try {
    localStorage.setItem(
      STORAGE_KEY_GALLERY,
      JSON.stringify(photos)
    );

    window.dispatchEvent(
      new Event('sangram_gallery_updated')
    );
  } catch (error) {
    console.error(
      'Failed to save gallery photos locally:',
      error
    );
  }
};

/* ---------------------------------------------------------
   PUBLIC GALLERY
--------------------------------------------------------- */

export const getPublicGalleryPhotos =
  async (): Promise<CustomGalleryItem[]> => {
    try {
      const response = await fetch(
        '/api/gallery?action=public'
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error(
        'Public gallery API error:',
        error
      );
    }

    const localPhotos = getStoredPhotos();

    return localPhotos.filter(
      (photo) => !photo.isPrivate
    );
  };

/* ---------------------------------------------------------
   ADMIN GALLERY
--------------------------------------------------------- */

export const getAllGalleryPhotos = async (
  token?: string | null
): Promise<CustomGalleryItem[]> => {
  if (token) {
    try {
      const response = await fetch(
        '/api/gallery?action=all',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error(
        'Admin gallery API error:',
        error
      );
    }
  }

  return getStoredPhotos();
};

/* ---------------------------------------------------------
   DATA URL -> BLOB
--------------------------------------------------------- */

function dataUrlToBlob(
  dataUrl: string
): Blob {
  const parts = dataUrl.split(',');

  if (parts.length !== 2) {
    throw new Error(
      'Invalid image data.'
    );
  }

  const header = parts[0];
  const base64Data = parts[1];

  const match =
    header.match(
      /^data:([^;]+);base64$/
    );

  if (!match) {
    throw new Error(
      'Invalid image format.'
    );
  }

  const contentType = match[1];

  const binaryString =
    atob(base64Data);

  const bytes = new Uint8Array(
    binaryString.length
  );

  for (
    let index = 0;
    index < binaryString.length;
    index++
  ) {
    bytes[index] =
      binaryString.charCodeAt(index);
  }

  return new Blob(
    [bytes],
    { type: contentType }
  );
}

/* ---------------------------------------------------------
   DIRECT VERCEL BLOB UPLOAD
--------------------------------------------------------- */

export const uploadGalleryPhoto = async (
  photoData: {
    title: string;
    category: string;
    categoryLabel: string;
    image: string;
    caption: string;
    isPrivate: boolean;
  },
  token?: string | null
): Promise<CustomGalleryItem> => {
  if (!token) {
    throw new Error(
      'Admin authentication required.'
    );
  }

  if (!photoData.image) {
    throw new Error(
      'Image is required.'
    );
  }

  try {
    /* ---------------------------------------------------
       STEP 1
       Convert selected image data URL to Blob
    --------------------------------------------------- */

    const imageBlob =
      dataUrlToBlob(
        photoData.image
      );

    const contentType =
      imageBlob.type ||
      'image/jpeg';

    const extension =
      contentType === 'image/png'
        ? 'png'
        : contentType === 'image/webp'
          ? 'webp'
          : contentType === 'image/gif'
            ? 'gif'
            : 'jpg';

    const filename =
      `sangram-resin-art-${Date.now()}.${extension}`;

    /* ---------------------------------------------------
       STEP 2
       Ask API for secure Vercel Blob upload URL
    --------------------------------------------------- */

    const createUploadResponse =
      await fetch(
        '/api/gallery?action=create-upload',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            Authorization:
              `Bearer ${token}`
          },
          body: JSON.stringify({
            filename,
            contentType
          })
        }
      );

    if (!createUploadResponse.ok) {
      const errorText =
        await createUploadResponse.text();

      throw new Error(
        errorText ||
        'Could not create upload URL.'
      );
    }

    const uploadInfo =
      await createUploadResponse.json();

    if (
      !uploadInfo.uploadUrl ||
      !uploadInfo.id ||
      !uploadInfo.pathname
    ) {
      throw new Error(
        'Invalid upload response from server.'
      );
    }

    /* ---------------------------------------------------
       STEP 3
       Upload image DIRECTLY to Vercel Blob
       Browser -> Vercel Blob
    --------------------------------------------------- */

    const blobUploadResponse =
      await fetch(
        uploadInfo.uploadUrl,
        {
          method: 'PUT',
          headers: {
            'Content-Type':
              contentType
          },
          body: imageBlob
        }
      );

    if (!blobUploadResponse.ok) {
      throw new Error(
        'Image upload to Vercel Blob failed.'
      );
    }

    /* ---------------------------------------------------
       STEP 4
       Save gallery metadata
    --------------------------------------------------- */

    const saveResponse =
      await fetch(
        '/api/gallery?action=save',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
            Authorization:
              `Bearer ${token}`
          },
          body: JSON.stringify({
            id: uploadInfo.id,
            pathname:
              uploadInfo.pathname,
            contentType,
            title:
              photoData.title,
            category:
              photoData.category,
            categoryLabel:
              photoData.categoryLabel,
            caption:
              photoData.caption,
            isPrivate:
              photoData.isPrivate,
            createdAt:
              new Date().toISOString(),
            uploadedBy:
              'Studio Admin'
          })
        }
      );

    if (!saveResponse.ok) {
      const errorText =
        await saveResponse.text();

      throw new Error(
        errorText ||
        'Could not save gallery metadata.'
      );
    }

    const savedPhoto =
      await saveResponse.json();

    /* ---------------------------------------------------
       LOCAL CACHE
    --------------------------------------------------- */

    try {
      const existing =
        getStoredPhotos();

      saveStoredPhotos([
        savedPhoto,
        ...existing
      ]);
    } catch {
      // Ignore local cache errors.
    }

    return savedPhoto;

  } catch (error) {
    console.error(
      'Vercel Blob gallery upload failed:',
      error
    );

    throw error;
  }
};

/* ---------------------------------------------------------
   TOGGLE PRIVATE / PUBLIC
--------------------------------------------------------- */

export const togglePhotoVisibility =
  async (
    photoId: string,
    makePrivate: boolean,
    token?: string | null
  ): Promise<boolean> => {

    if (!token) {
      throw new Error(
        'Admin authentication required.'
      );
    }

    try {
      const response =
        await fetch(
          `/api/gallery/${encodeURIComponent(
            photoId
          )}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type':
                'application/json',
              Authorization:
                `Bearer ${token}`
            },
            body: JSON.stringify({
              isPrivate:
                makePrivate
            })
          }
        );

      if (!response.ok) {
        throw new Error(
          'Failed to change photo visibility.'
        );
      }

      const existing =
        getStoredPhotos();

      const updated =
        existing.map(
          (photo) =>
            photo.id === photoId
              ? {
                  ...photo,
                  isPrivate:
                    makePrivate
                }
              : photo
        );

      saveStoredPhotos(updated);

      return true;

    } catch (error) {
      console.error(
        'Visibility update failed:',
        error
      );

      throw error;
    }
  };

/* ---------------------------------------------------------
   DELETE PHOTO
--------------------------------------------------------- */

export const deleteGalleryPhoto =
  async (
    photoId: string,
    token?: string | null
  ): Promise<boolean> => {

    if (!token) {
      throw new Error(
        'Admin authentication required.'
      );
    }

    try {
      const response =
        await fetch(
          `/api/gallery/${encodeURIComponent(
            photoId
          )}`,
          {
            method: 'DELETE',
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (!response.ok) {
        throw new Error(
          'Failed to delete photo.'
        );
      }

      const existing =
        getStoredPhotos();

      const updated =
        existing.filter(
          (photo) =>
            photo.id !== photoId
        );

      saveStoredPhotos(updated);

      return true;

    } catch (error) {
      console.error(
        'Delete gallery photo failed:',
        error
      );

      throw error;
    }
  };
