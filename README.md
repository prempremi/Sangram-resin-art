# Sangram Resin Art

> **"All Types Resin Art Design & Printing Services Available"**  
> Handcrafted bespoke resin art pieces, luxury name plates, geode wall clocks, and full commercial printing services in Odisha, India.

---

## 🌟 Overview

**Sangram Resin Art** is a modern, mobile-first business website built with **React 19**, **Vite 8**, **TypeScript**, and **Tailwind CSS**. It is tailored for local in-person conversion, store directions, and direct customer consultations via Phone and WhatsApp.

### Key Highlights:
- **Resin Art Collections**: Custom teakwood and acrylic name plates, geode clocks with quartz crystals, preserved wedding flower (varmala) blocks, and live-edge serving trays.
- **Commercial Printing & Signage**: Flex banners, self-adhesive vinyl prints, visiting cards, traditional Indian wedding invitations, photo enlargements, and 3D acrylic LED storefront boards.
- **Offline Business Architecture**: Clear notices directing customers to the physical studio in Odisha for custom material proofs and collection.
- **Interactive Google Map Integration**: Exact geolocation pin with one-tap directions (`20.769753, 86.468659`).
- **Direct Conversion Channels**: Integrated FormSubmit inquiry form, direct click-to-call (`+91 73815 22808`), and pre-filled WhatsApp ordering links.
- **Floating Controls**: Smart scroll-detected floating **"Back to Top"** button and mobile sticky action bar complying with the mobile viewport height budget.

---

## 🚀 One-Click Deployment to Vercel

This repository is pre-configured and 100% production-ready for deployment on **Vercel**.

### Option 1: Via Vercel Dashboard (Recommended)
1. Push this repository to your **GitHub** account.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Select your GitHub repository **`sangram-resin-art`**.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**! Your website will be live with free SSL in less than 60 seconds.

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/your-username/sangram-resin-art.git
cd sangram-resin-art

# 2. Install dependencies
npm install

# 3. Start local development server (runs on port 3000)
npm run dev

# 4. Build for production (output to dist/)
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
├── public/                 # Static assets copied directly to dist/ (production-ready)
│   └── images/             # High-resolution resin art & printing photography
├── src/
│   ├── components/         # Modular React components
│   │   ├── Navbar.tsx          # Top bar with offline notice & mobile drawer
│   │   ├── Hero.tsx            # Business hero with CTAs and proof markers
│   │   ├── ServicesSection.tsx # Catalog grid with category filter
│   │   ├── WhyChooseUs.tsx     # 5 key competitive advantages
│   │   ├── GallerySection.tsx  # Work showcase with category filtering
│   │   ├── LocationSection.tsx # Interactive Google Map & visit guide
│   │   ├── ContactSection.tsx  # FormSubmit inquiry form & direct phone/WhatsApp
│   │   ├── Footer.tsx          # Business details, quick links & copyright
│   │   └── FloatingActions.tsx # WhatsApp, Call, & scroll-detected Back to Top
│   ├── data/
│   │   └── services.ts     # Service catalog & gallery data
│   ├── App.tsx             # Root page layout & section composition
│   ├── main.tsx            # React 19 entry point
│   └── index.css           # Tailwind CSS & custom desi motif patterns
├── index.html              # SEO metadata, OpenGraph tags & typography
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment & SPA routing configuration
└── vite.config.ts          # Vite configuration with Tailwind CSS & ESM paths
```

---

## 📍 Business Location & Coordinates

- **Shop Name**: Sangram Resin Art
- **State & Country**: Odisha, India
- **Coordinates**: Latitude: `20.769753`, Longitude: `86.468659`
- **Google Maps Link**: [Open in Google Maps](https://www.google.com/maps?q=20.769753,86.468659)
- **Phone / WhatsApp**: [+91 73815 22808](tel:+917381522808)
- **Email**: contact@sangramresinart.com

---

## 📄 License

This project is licensed under the Apache-2.0 License.
