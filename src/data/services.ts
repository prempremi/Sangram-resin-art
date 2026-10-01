export interface ServiceItem {
  id: string;
  category: 'resin-art' | 'printing-banner';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  details: string;
  iconName: string;
  image: string;
  popularSizes: string;
  turnaroundTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'resin' | 'banners' | 'boards' | 'stationery' | 'vinyl';
  categoryLabel: string;
  image: string;
  caption: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  // Resin Art Categories (Prominently featured)
  {
    id: 'resin-name-plates',
    category: 'resin-art',
    categoryLabel: 'Resin Art',
    title: 'Custom Resin Name Plates',
    shortDesc: 'Luxury handcrafted house and door nameboards with teakwood, acrylic, and 24K gold foil lettering.',
    details: 'Bespoke entrance boards poured with crystal-clear, non-yellowing epoxy resin. Embedded with natural flowers, gold flakes, or stone textures in custom English, Odia, and Hindi fonts.',
    iconName: 'Sparkles',
    image: '/src/assets/images/resin_name_plates_1790842724103.jpg',
    popularSizes: '12"x6", 15"x8", 18"x10", 24"x12" or custom dimensions',
    turnaroundTime: '4 - 7 days (Handcrafted & cured)'
  },
  {
    id: 'resin-wall-clocks',
    category: 'resin-art',
    categoryLabel: 'Resin Art',
    title: 'Resin Geode Clocks & Wall Decor',
    shortDesc: 'Artisanal fluid resin wall clocks and agate geode canvases with metallic accents and raw crystals.',
    details: 'Multi-layer 3D depth with crushed glass, natural quartz crystals, and hand-gilded gold veins. Fitted with high-torque silent quartz movements.',
    iconName: 'Clock',
    image: '/src/assets/images/resin_wall_art_1790842744906.jpg',
    popularSizes: '14", 18", 24", 36" round or custom panels',
    turnaroundTime: '5 - 8 days'
  },
  {
    id: 'resin-keepsakes-decor',
    category: 'resin-art',
    categoryLabel: 'Resin Art',
    title: 'Resin Keepsakes & Gift Decor',
    shortDesc: 'Preserved wedding varmala flowers, memory photo blocks, keychains, and live-edge serving trays.',
    details: 'Preserve cherished marriage garlands or milestone memories permanently inside crystal resin. Also includes handcrafted resin serving trays with brass handles.',
    iconName: 'HeartHandshake',
    image: '/src/assets/images/resin_custom_gifts_1790842758458.jpg',
    popularSizes: '8"x8", 10"x10" blocks, 14"x10" trays',
    turnaroundTime: '5 - 10 days'
  },

  // Printing & Banner Services
  {
    id: 'flex-banner',
    category: 'printing-banner',
    categoryLabel: 'Printing',
    title: 'Flex Banner Printing',
    shortDesc: 'Heavy-duty weatherproof outdoor banners with vibrant all-weather eco-solvent inks.',
    details: 'Custom size flex printing for business promotions, grand openings, events, elections, and cultural festivals with reinforced brass eyelets.',
    iconName: 'Printer',
    image: '/src/assets/images/print_flex_banner_1790843441117.jpg',
    popularSizes: '3x2 ft, 6x3 ft, 8x4 ft, 10x5 ft, 20x10 ft or any custom scale',
    turnaroundTime: 'Same-day or next-day'
  },
  {
    id: 'vinyl-printing',
    category: 'printing-banner',
    categoryLabel: 'Printing',
    title: 'Vinyl Printing',
    shortDesc: 'High-definition self-adhesive vinyl prints with scratch-resistant protective coating.',
    details: 'Premium adhesive vinyl for glass shopfronts, vehicle branding, product stickers, wall graphics, and directional signage.',
    iconName: 'Layers',
    image: '/src/assets/images/print_vinyl_posters_1790843477060.jpg',
    popularSizes: 'Custom roll widths in Matte / Gloss',
    turnaroundTime: '24 hours'
  },
  {
    id: 'poster-printing',
    category: 'printing-banner',
    categoryLabel: 'Printing',
    title: 'Poster Printing',
    shortDesc: 'Vibrant full-color presentation posters, promotional announcements, and event prints.',
    details: 'Rich, non-fading CMYK reproduction on 220–300 GSM photo art paper for indoor notices, exhibitions, and sales campaigns.',
    iconName: 'FileText',
    image: '/src/assets/images/print_vinyl_posters_1790843477060.jpg',
    popularSizes: 'A4, A3, 12x18 inches, 18x24 inches, 24x36 inches',
    turnaroundTime: 'Same-day fast service'
  },
  {
    id: 'visiting-cards',
    category: 'printing-banner',
    categoryLabel: 'Stationery',
    title: 'Visiting Cards',
    shortDesc: 'Executive business cards with luxury matte lamination, spot UV, and gold foil accents.',
    details: 'Make an unforgettable first impression. Choose from 350 GSM art cards, velvet touch finishes, metallic inks, and rounded corners.',
    iconName: 'CreditCard',
    image: '/src/assets/images/print_stationery_cards_1790843455231.jpg',
    popularSizes: 'Standard 3.5 x 2.0 inches (Single / Double Sided)',
    turnaroundTime: '24 - 48 hours'
  },
  {
    id: 'wedding-cards',
    category: 'printing-banner',
    categoryLabel: 'Stationery',
    title: 'Wedding Cards',
    shortDesc: 'Traditional Indian wedding invitations with gold foil stamping and ornate desi motifs.',
    details: 'Exquisite marriage invitation cards, shadi card envelopes, and ceremony programs in Odia, Hindi, and English with royal embossed borders.',
    iconName: 'HeartHandshake',
    image: '/src/assets/images/print_stationery_cards_1790843455231.jpg',
    popularSizes: 'Traditional folding, box cards, scroll invites',
    turnaroundTime: '3 - 5 days'
  },
  {
    id: 'photo-printing',
    category: 'printing-banner',
    categoryLabel: 'Printing',
    title: 'Photo Printing',
    shortDesc: 'Studio-grade high-resolution portrait, studio passport, and memory photo enlargements.',
    details: 'Crystal-clear color reproduction with archival inks that preserve family milestones, official ID portraits, and framed wall memories.',
    iconName: 'Camera',
    image: '/src/assets/images/print_vinyl_posters_1790843477060.jpg',
    popularSizes: '4x6, 5x7, 8x10, 12x18, 16x20 inches',
    turnaroundTime: 'Instant / Same-day'
  },
  {
    id: 'custom-banner-design',
    category: 'printing-banner',
    categoryLabel: 'Design',
    title: 'Custom Banner Design',
    shortDesc: 'On-spot graphic design services tailored to your shop branding and message.',
    details: 'Sit directly with our in-house graphic designers to customize typography, incorporate high-res logos, and finalize attractive layout compositions.',
    iconName: 'Palette',
    image: '/src/assets/images/hero_printing_press_1790843426570.jpg',
    popularSizes: 'Custom banner layouts & social media formats',
    turnaroundTime: 'Live consultation in shop'
  },
  {
    id: 'shop-board-design',
    category: 'printing-banner',
    categoryLabel: 'Signage',
    title: 'Shop Board Design',
    shortDesc: 'Outdoor 3D acrylic LED channel letters, glow-sign boards, and ACP panel fabrication.',
    details: 'Durable commercial storefront signboards built with waterproof LED modules, rust-proof aluminium framing, and high-visibility front illumination.',
    iconName: 'Signpost',
    image: '/src/assets/images/print_shop_boards_1790843466377.jpg',
    popularSizes: 'Custom store frontage (e.g. 10x3 ft, 15x4 ft)',
    turnaroundTime: '3 - 6 days'
  },
  {
    id: 'lamination-finishing',
    category: 'printing-banner',
    categoryLabel: 'Finishing',
    title: 'Lamination & Finishing',
    shortDesc: 'Thermal matte/gloss encapsulation, foam board mounting, eyeleting, and binding.',
    details: 'Complete finishing services to protect your certificates, posters, and menus from water, humidity, and wear and tear.',
    iconName: 'ShieldCheck',
    image: '/src/assets/images/print_flex_banner_1790843441117.jpg',
    popularSizes: 'Up to 40 inches roll width lamination',
    turnaroundTime: 'While you wait'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-resin-1',
    title: 'Custom Resin Teakwood Name Plate',
    category: 'resin',
    categoryLabel: 'Resin Art',
    image: '/src/assets/images/resin_name_plates_1790842724103.jpg',
    caption: 'Bespoke entrance board with seasoned teakwood, clear resin, and 24K gold foil lettering.'
  },
  {
    id: 'gal-resin-2',
    title: 'Geode Agate Resin Wall Clock',
    category: 'resin',
    categoryLabel: 'Resin Art',
    image: '/src/assets/images/resin_wall_art_1790842744906.jpg',
    caption: 'Fluid resin wall art with natural quartz crystals, gold leaf veins, and silent quartz movement.'
  },
  {
    id: 'gal-resin-3',
    title: 'Preserved Varmala Keepsake Block',
    category: 'resin',
    categoryLabel: 'Resin Art',
    image: '/src/assets/images/resin_custom_gifts_1790842758458.jpg',
    caption: 'Eternal wedding flower preservation block and personalized resin photo keepsakes.'
  },
  {
    id: 'gal-resin-4',
    title: 'Hand-Poured Resin Serving Tray Set',
    category: 'resin',
    categoryLabel: 'Resin Art',
    image: '/src/assets/images/resin_decorative_items_1790842767822.jpg',
    caption: 'Natural live-edge wood serving tray with swirling ivory-gold resin and brass handles.'
  },
  {
    id: 'gal-1',
    title: 'Outdoor Heavy Flex Banner',
    category: 'banners',
    categoryLabel: 'Flex Banner',
    image: '/src/assets/images/print_flex_banner_1790843441117.jpg',
    caption: 'Vibrant outdoor promotional flex with reinforced eyelets and edge taping.'
  },
  {
    id: 'gal-2',
    title: '3D Acrylic LED Shop Board',
    category: 'boards',
    categoryLabel: 'Shop Board',
    image: '/src/assets/images/print_shop_boards_1790843466377.jpg',
    caption: 'Illuminated storefront signage with bright night visibility and weatherproof frame.'
  },
  {
    id: 'gal-3',
    title: 'Gold Foil Indian Wedding Invites',
    category: 'stationery',
    categoryLabel: 'Wedding Cards',
    image: '/src/assets/images/print_stationery_cards_1790843455231.jpg',
    caption: 'Traditional embossed wedding cards with gold foil stamping and intricate motifs.'
  },
  {
    id: 'gal-4',
    title: 'High-Gloss Vinyl & Art Posters',
    category: 'vinyl',
    categoryLabel: 'Vinyl & Posters',
    image: '/src/assets/images/print_vinyl_posters_1790843477060.jpg',
    caption: 'Scratch-resistant vinyl stickers and promotional posters with rich CMYK depth.'
  }
];
