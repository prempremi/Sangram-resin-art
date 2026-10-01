# Sangram Resin Art

> **"All Types Resin Art Design & Printing Services Available"**  
> Handcrafted bespoke resin art pieces, luxury name plates, geode wall clocks, and full commercial printing services in Odisha, India.

---

## 🌟 Overview

**Sangram Resin Art** is a modern, mobile-first business website built with **React 19**, **Vite 8**, **TypeScript**, and **Tailwind CSS**. It is tailored for local in-person conversion, store directions, and direct customer consultations via Phone and WhatsApp.

### Upgraded Key Highlights:
- **Resin Products Section (Display Only)**: Dedicated showcase for **Keychains**, **Photo Frames**, and **Custom Gifts** (wedding varmala flower preservation blocks). Strictly display-only (no e-commerce, no cart) directing customers to visit the Odisha studio.
- **Production Authentication & Role System**:
  - Secure JWT authentication with PBKDF2 cryptographic password hashing (100,000 iterations SHA-512) and constant-time timing-safe verification.
  - Signed JSON Web Tokens (HS256) with 7-day expiration and automatic session validation on app load.
  - Auth is **NOT required** for public browsing: visitors can freely view all products, print services, gallery items, and submit offline inquiries without signing in.
  - **Two Roles**:
    - **Admin**: Full access to `/admin-dashboard`, visitor analytics, photo upload system, and private vault.
    - **User**: Customer role; can log in and view their customer status, but restricted from the admin dashboard.
- **Admin Dashboard (`/admin-dashboard`)**:
  - Protected route with client-side and server-side role validation (non-admins are automatically redirected).
  - **Visitor Analytics**: Real-time tracking of total visitors, page views, device breakdown (mobile vs desktop), and recent visitor logs.
  - **Photo Upload System**: Upload new photos with title, category, caption, and image preview.
  - **Private Gallery Vault (Admin Only)**: Photos marked as "Private" remain strictly inside the admin vault.
  - **Public Gallery Toggle Control**: 1-click toggle switch to publish private photos live to the website or pull public photos back into the private vault.
- **Interactive Google Map Integration**: Exact geolocation pin with one-tap directions (`20.769753, 86.468659`).
- **Direct Conversion Channels**: Integrated FormSubmit inquiry form, direct click-to-call (`+91 73815 22808`), and pre-filled WhatsApp ordering links.
- **Floating Controls**: Smart scroll-detected floating **"Back to Top"** button and mobile sticky action bar.

---

## 🔐 Administrator Access & Registration

### Initial Store Administrator
The store owner account is pre-registered on first launch:
* **Administrator Email**: `rubixcubesolver649@gmail.com` (or `admin@sangramresinart.com`)
* **Default Setup Password**: `Sangram@2026`

*(You can update your password or create additional accounts at any time through the Sign Up modal).*

### Registering New Staff / Administrators
To register a new administrator account, click **"Create Account"** in the navigation, expand **"Have an Admin Registration Key?"**, and enter the studio administrator passkey:
```
sangram_admin_key_2026
```
*(This can be customized via the `ADMIN_REGISTRATION_KEY` environment variable).*

---

## 🚀 One-Click Deployment to Vercel

This repository is pre-configured and 100% production-ready for deployment on **Vercel**.

### Via Vercel Dashboard
1. Push this repository to your **GitHub** account (`rubixcubesolver649-sudo/Sangram-resin-art`).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Select your GitHub repository **`sangram-resin-art`**.
5. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**!

---

## 🛠️ Local Development & Build

```bash
# 1. Install dependencies
npm install

# 2. Start development server (runs on port 3000)
npm run dev

# 3. Build for production (output to dist/)
npm run build

# 4. Run full-stack production server
npm run start
```

---

## 📁 Project Architecture

```
├── public/                     # Static assets copied directly to dist/
│   └── images/                 # High-resolution resin art & printing photography
├── src/
│   ├── components/             # Modular React components
│   │   ├── AdminDashboard.tsx      # Secure /admin-dashboard with Analytics & Vault
│   │   ├── AuthModal.tsx           # Production Sign In / Sign Up dialog
│   │   ├── ResinProductsSection.tsx# Display-only section: Keychains, Frames & Gifts
│   │   ├── Navbar.tsx              # Top bar with auth indicators & mobile drawer
│   │   ├── Hero.tsx                # Business hero with CTAs
│   │   ├── ServicesSection.tsx     # 9 Core services catalog
│   │   ├── GallerySection.tsx      # Dynamic public portfolio with published photos
│   │   ├── WhyChooseUs.tsx         # 5 key competitive advantages
│   │   ├── LocationSection.tsx     # Interactive Google Map (Odisha, India)
│   │   ├── ContactSection.tsx      # Offline order form & WhatsApp channels
│   │   ├── Footer.tsx              # Discrete Admin Portal link & copyright
│   │   └── FloatingActions.tsx     # WhatsApp, Call & Back to Top controls
│   ├── context/
│   │   └── AuthContext.tsx         # Production JWT auth & role management
│   ├── services/
│   │   ├── analyticsService.ts     # Real pageview tracker & analytics reporting
│   │   └── galleryService.ts       # Photo uploads, privacy toggle & vault storage
│   ├── data/
│   │   ├── resinProducts.ts        # Resin Keychains, Frames, and Gifts data
│   │   └── services.ts             # Services and gallery sample catalog
│   ├── types/
│   │   └── auth.ts                 # TypeScript interfaces for auth & analytics
│   ├── App.tsx                 # Route guard, layout & section composition
│   └── main.tsx                # React 19 entry point
├── server.ts                   # Full-stack Express server with Auth & Analytics APIs
├── vercel.json                 # Vercel deployment & SPA routing configuration
└── vite.config.ts              # Vite configuration with Tailwind CSS & ESM paths
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
