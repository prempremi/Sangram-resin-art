export interface ProductItem {
  id: string;
  category: 'name-plates' | 'wall-art' | 'custom-gifts' | 'decorative-items';
  categoryLabel: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  features: string[];
  materials: string;
  turnaround: string;
  dimensions: string;
  popularFor: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'name-plates',
    category: 'name-plates',
    categoryLabel: 'Name Plates',
    title: 'Bespoke Resin & Teakwood Name Boards',
    subtitle: 'Luxury entrance & door name plates with gold accents',
    image: '/images/resin_name_plates.jpg',
    description: 'Custom handcrafted house and office name plates made with aged natural wood, crystal-clear epoxy resin, and lustrous gold foil lettering. Weatherproof and UV-resistant for lifelong brilliance.',
    features: [
      'Custom fonts & language scripts (English, Odia, Hindi)',
      'Waterproof & non-yellowing UV protected resin',
      'Solid treated teakwood & acrylic base options',
      'Pre-drilled mounting brass studs included'
    ],
    materials: 'High-gloss epoxy resin, 24K gold foil, natural seasoned teakwood, brass fittings',
    turnaround: '5 - 7 business days',
    dimensions: '12"x6", 15"x8", 18"x10", or custom bespoke sizes',
    popularFor: 'Housewarming (Griha Pravesh) gifts, villa entrances, executive cabins'
  },
  {
    id: 'wall-art',
    category: 'wall-art',
    categoryLabel: 'Wall Art',
    title: 'Geode & Ocean Wave Resin Wall Art',
    subtitle: 'Striking statement wall clocks & textured geode canvases',
    image: '/images/resin_wall_art.jpg',
    description: 'Captivating fluid resin artwork incorporating natural mineral crystals, crushed quartz, metallic pigment swirls, and hand-gilded 24k gold veins that catch sunlight at every angle.',
    features: [
      'Multi-layered 3D depth and shimmer effect',
      'Silent sweep quartz clock mechanism options',
      'Natural semi-precious crystal & mica inclusions',
      'Sturdy moisture-resistant wooden backing'
    ],
    materials: 'Multi-layer casting resin, raw agate slices, gold mica pigments, reinforced MDF base',
    turnaround: '7 - 10 business days',
    dimensions: '14", 18", 24", 36" round or custom rectangular panels',
    popularFor: 'Living room focal walls, master bedrooms, boutique hotels, meditation spaces'
  },
  {
    id: 'custom-gifts',
    category: 'custom-gifts',
    categoryLabel: 'Customized Gifts',
    title: 'Personalized Keepsakes & Preserved Memories',
    subtitle: 'Wedding garland preservation, resin photo frames & gift sets',
    image: '/images/resin_custom_gifts.jpg',
    description: 'Transform special memories into eternal art. We preserve wedding garlands (varmala), memorable photographs, milestone dates, and personal tokens inside ultra-clear glass-like resin.',
    features: [
      'Varmala / wedding flower drying & preservation technique',
      'High-resolution embedded photographs that never fade',
      'Personalized names, initials & anniversary dates',
      'Luxury gift packaging with handwritten artisan note'
    ],
    materials: 'Optical-grade crystal casting resin, preserved botanicals, archival photo paper',
    turnaround: '7 - 14 business days (includes delicate botanical dehydration)',
    dimensions: '8"x8", 10"x10", 12"x12" hexagon, square, or arch blocks',
    popularFor: 'Weddings, anniversaries, birthdays, retirement keepsakes'
  },
  {
    id: 'decorative-items',
    category: 'decorative-items',
    categoryLabel: 'Decorative Items',
    title: 'Artisanal Trays, Coasters & Table Accents',
    subtitle: 'Hand-poured resin decor with brass handles & gold leaf dust',
    image: '/images/resin_decorative_items.jpg',
    description: 'Functional luxury for your dining and coffee table. Serving trays featuring raw live-edge wood inlays, swirling ivory marble patterns, and matching hexagonal drink coaster sets.',
    features: [
      'Heat resistant up to 90°C for hot beverage mugs',
      'Heavy-duty brushed gold metal handles',
      'Non-slip silicone feet on trays and coasters',
      'Food-safe cured resin surface finish'
    ],
    materials: 'Food-safe certified epoxy resin, natural mango/teak wood, brass alloy hardware',
    turnaround: '4 - 6 business days',
    dimensions: 'Tray: 14"x10", Coasters: 4"x4" (Set of 4 or 6)',
    popularFor: 'Festive dining, Diwali gifting, corporate hampers, luxury table styling'
  }
];
