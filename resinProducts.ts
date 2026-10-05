export interface ResinProductItem {
  id: string;
  category: 'keychains' | 'photo-frames' | 'custom-gifts';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  description: string;
  image: string;
  materials: string;
  customizationOptions: string[];
  dimensions: string;
  offlineNote: string;
}

export const RESIN_PRODUCTS: ResinProductItem[] = [
  // 1. Keychains
  {
    id: 'resin-keychains',
    category: 'keychains',
    categoryLabel: 'Resin Keychains',
    title: 'Custom Alphabet & Floral Keychains',
    shortDesc: 'Handcrafted initials, real dried botanicals, and shimmering gold foil flakes with rust-proof brass keyrings.',
    description: 'Bespoke crystal epoxy resin initial keychains crafted to order. Infused with natural flowers, shimmer flakes, or dual-tone resin swirls. Perfect for personal keepsakes, vehicle keys, and heartfelt gift hampers.',
    image: '/images/resin_decorative_items.svg',
    materials: 'Optical-grade non-yellowing epoxy resin, dried natural florals, 24K gold foil, high-gauge brass keyring hardware.',
    customizationOptions: [
      'Any alphabet letter (A-Z) or number (0-9)',
      'Natural pressed flower petals or gold/silver leaf inlays',
      'Name tag micro-charms attached',
      'Custom color gradient choices'
    ],
    dimensions: 'Letter height: 4.5 cm | Thickness: 0.8 cm',
    offlineNote: 'Crafted on-demand. Visit our Odisha workshop to choose your favorite letter mould and color pigments.'
  },

  // 2. Photo Frames
  {
    id: 'resin-photo-frames',
    category: 'photo-frames',
    categoryLabel: 'Photo Frames',
    title: 'Preserved Resin Photo Frames',
    shortDesc: 'Permanent high-gloss photo embedding with delicate floral borders, pearl shimmer, and solid acrylic base.',
    description: 'Transform special memories into eternal art. Your precious photograph is sealed permanently inside high-gloss crystal resin, protected from moisture, fading, dust, and yellowing for decades.',
    image: '/images/resin_custom_gifts.svg',
    materials: 'High-clarity UV-stabilized casting resin, archival museum photo paper, natural flora, gold dusting, sturdy display stand.',
    customizationOptions: [
      'Couple portraits, baby milestones & anniversary photos',
      'Preserved rose petals and baby breath flowers',
      'Custom gold embossed dates, quotes & names',
      'Rectangular, hexagonal, or arched silhouettes'
    ],
    dimensions: 'Standard sizes: 6"x4", 7"x5", 8"x8", 10"x8" or bespoke desk displays',
    offlineNote: 'Bring your physical photograph or high-res digital copy to our shop for live framing proofs.'
  },

  // 3. Custom Gifts
  {
    id: 'resin-custom-gifts',
    category: 'custom-gifts',
    categoryLabel: 'Custom Gifts',
    title: 'Varmala Keepsakes & Custom Keepsake Blocks',
    shortDesc: 'Cherished wedding varmala garland preservation, memory preservation blocks, and artisan serving gifts.',
    description: 'Preserve real wedding garlands (varmala) or sacred flowers inside a heavy, solid resin heirloom block. Also features personalized engagement ring platters and custom initial desk decor.',
    image: '/images/resin_name_plates.svg',
    materials: 'Botanical dehydration preservation, crystal resin casting, natural wood inlays, metallic gilding.',
    customizationOptions: [
      'Original wedding varmala flowers dehydration & layout',
      'Engagement ring holder depressions',
      'Custom couple names & wedding date engraving in gold/silver',
      'Hexagon, heart, or deep rectangular block formats'
    ],
    dimensions: '8"x8", 10"x10", 12"x12" blocks (2 to 3.5 inches depth)',
    offlineNote: 'Please hand over freshly dried garlands at our studio for proper botanical preparation before casting.'
  }
];
