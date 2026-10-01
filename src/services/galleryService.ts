import { CustomGalleryItem } from '../types/auth';

const STORAGE_KEY_GALLERY = 'sangram_custom_gallery_photos_v2';

// Initial studio vault records
const STUDIO_VAULT_PHOTOS: CustomGalleryItem[] = [
  {
    id: 'vault_item_1',
    title: 'Royal Agate Geode Resin Wall Clock',
    category: 'resin',
    categoryLabel: 'Resin Art',
    image: '/images/resin_wall_art.jpg',
    caption: 'Private Vault: 36-inch bespoke crystal geode wall clock with crushed quartz crystals and 24K gold foil veins.',
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
    caption: 'Private Vault: Real wedding garland botanical dehydration layout with embedded anniversary vows.',
    isPrivate: true,
    createdAt: new Date().toISOString(),
    uploadedBy: 'Studio Admin'
  }
];

export const getStoredPhotos = (): CustomGalleryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GALLERY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(STUDIO_VAULT_PHOTOS));
      return STUDIO_VAULT_PHOTOS;
    }
    return JSON.parse(raw);
  } catch {
    return STUDIO_VAULT_PHOTOS;
  }
};

export const saveStoredPhotos = (photos: CustomGalleryItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(photos));
    // Trigger event so public gallery re-renders dynamically when updated
    window.dispatchEvent(new Event('sangram_gallery_updated'));
  } catch (err) {
    console.error('Failed to save gallery photos to storage', err);
  }
};

export const getPublicGalleryPhotos = async (): Promise<CustomGalleryItem[]> => {
  try {
    const res = await fetch('/api/gallery/public');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // offline fallback
  }

  const all = getStoredPhotos();
  return all.filter((p) => !p.isPrivate);
};

export const getAllGalleryPhotos = async (token?: string | null): Promise<CustomGalleryItem[]> => {
  if (token) {
    try {
      const res = await fetch('/api/gallery/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
  }

  return getStoredPhotos();
};

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
  const newPhoto: CustomGalleryItem = {
    id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...photoData,
    createdAt: new Date().toISOString(),
    uploadedBy: 'Studio Admin'
  };

  // Try API
  if (token) {
    try {
      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newPhoto)
      });
      if (res.ok) {
        const saved = await res.json();
        const existing = getStoredPhotos();
        saveStoredPhotos([saved, ...existing]);
        return saved;
      }
    } catch {
      // offline fallback
    }
  }

  // Local storage save
  const existing = getStoredPhotos();
  const updated = [newPhoto, ...existing];
  saveStoredPhotos(updated);
  return newPhoto;
};

export const togglePhotoVisibility = async (
  photoId: string,
  makePrivate: boolean,
  token?: string | null
): Promise<boolean> => {
  if (token) {
    try {
      await fetch(`/api/gallery/${photoId}/visibility`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isPrivate: makePrivate })
      });
    } catch {
      // offline fallback
    }
  }

  const existing = getStoredPhotos();
  const updated = existing.map((p) => (p.id === photoId ? { ...p, isPrivate: makePrivate } : p));
  saveStoredPhotos(updated);
  return true;
};

export const deleteGalleryPhoto = async (photoId: string, token?: string | null): Promise<boolean> => {
  if (token) {
    try {
      await fetch(`/api/gallery/${photoId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch {
      // offline fallback
    }
  }

  const existing = getStoredPhotos();
  const updated = existing.filter((p) => p.id !== photoId);
  saveStoredPhotos(updated);
  return true;
};
