import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'sangram_resin_art_production_jwt_secret_2026_secure';
const ADMIN_KEY = process.env.ADMIN_REGISTRATION_KEY || 'sangram_admin_key_2026';
const OWNER_EMAIL = process.env.ADMIN_EMAIL || 'rubixcubesolver649@gmail.com';

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// -------------------------------------------------------------
// Real Persistent JSON Database System
// -------------------------------------------------------------
const DB_DIR = path.resolve(__dirname, 'data');
const DB_PATH = path.resolve(DB_DIR, 'database.json');

interface DbUser {
  id: string;
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface DbVisit {
  id: string;
  path: string;
  timestamp: string;
  device: 'mobile' | 'desktop' | 'tablet';
  referrer: string;
  city?: string;
}

interface DbPhoto {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  caption: string;
  isPrivate: boolean;
  createdAt: string;
  uploadedBy?: string;
}

interface DatabaseSchema {
  users: DbUser[];
  visits: DbVisit[];
  photos: DbPhoto[];
}

// Cryptographic Password Hashing with PBKDF2 (100,000 iterations SHA-512)
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  try {
    const computedHash = hashPassword(password, salt);
    const hashBuffer = Buffer.from(computedHash, 'hex');
    const storedBuffer = Buffer.from(storedHash, 'hex');
    if (hashBuffer.length !== storedBuffer.length) return false;
    return crypto.timingSafeEqual(hashBuffer, storedBuffer);
  } catch {
    return false;
  }
}

// JWT Token Creation with HS256 and 7-day expiration
function createToken(payload: { id: string; email: string; role: 'admin' | 'user' }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 7 * 24 * 60 * 60; // 7 days expiration
  const body = Buffer.from(JSON.stringify({ ...payload, iat: now, exp })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token: string): { id: string; email: string; role: 'admin' | 'user'; exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (signature !== expectedSig) return null;
    
    const decoded = JSON.parse(Buffer.from(body, 'base64url').toString());
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      // Token expired
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

// Load database from disk or initialize with initial store owner
function loadDatabase(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_PATH)) {
    try {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Failed reading database file, initializing fresh store', e);
    }
  }

  // Initial seed with cryptographic hashes for Store Owner & Studio Administrator
  const adminSalt1 = crypto.randomBytes(16).toString('hex');
  const adminSalt2 = crypto.randomBytes(16).toString('hex');

  const initialDb: DatabaseSchema = {
    users: [
      {
        id: 'usr_admin_owner',
        name: 'Store Owner',
        email: OWNER_EMAIL.toLowerCase(),
        salt: adminSalt1,
        passwordHash: hashPassword('Sangram@2026', adminSalt1),
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr_admin_studio',
        name: 'Sangram Studio Admin',
        email: 'admin@sangramresinart.com',
        salt: adminSalt2,
        passwordHash: hashPassword('Sangram@2026', adminSalt2),
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ],
    visits: [
      {
        id: 'vis_init_1',
        path: '/',
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        device: 'mobile',
        referrer: 'Direct Visit',
        city: 'Odisha, IN'
      }
    ],
    photos: []
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
  return initialDb;
}

let db = loadDatabase();

function persistDatabase(): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting database:', err);
  }
}

// Middleware: Authenticate Admin
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Administrator privileges required' });
    return;
  }

  (req as any).user = decoded;
  next();
}

// -------------------------------------------------------------
// Real Authentication Endpoints
// -------------------------------------------------------------
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = db.users.find((u) => u.email === cleanEmail);

  if (!user || !verifyPassword(password, user.salt, user.passwordHash)) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = createToken({ id: user.id, email: user.email, role: user.role });
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

app.post('/api/auth/signup', (req: Request, res: Response) => {
  const { name, email, password, adminKey } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email, and password are required' });
    return;
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  // Basic email syntax validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    res.status(400).json({ error: 'Please enter a valid email address' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters long' });
    return;
  }

  if (db.users.some((u) => u.email === cleanEmail)) {
    res.status(409).json({ error: 'An account with this email already exists' });
    return;
  }

  // Role resolution: owner email or matching admin key grants admin privileges
  let role: 'admin' | 'user' = 'user';
  if (cleanEmail === OWNER_EMAIL.toLowerCase() || (adminKey && adminKey === ADMIN_KEY)) {
    role = 'admin';
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const newUser: DbUser = {
    id: `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    name: cleanName,
    email: cleanEmail,
    salt,
    passwordHash,
    role,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  persistDatabase();

  const token = createToken({ id: newUser.id, email: newUser.email, role: newUser.role });

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt
    }
  });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No authorization token provided' });
    return;
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ error: 'Invalid or expired session token' });
    return;
  }

  const user = db.users.find((u) => u.id === decoded.id);
  if (!user) {
    res.status(404).json({ error: 'User account not found' });
    return;
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  });
});

// -------------------------------------------------------------
// Real Analytics Endpoints
// -------------------------------------------------------------
app.post('/api/analytics/track', (req: Request, res: Response) => {
  const { path: visitPath, device, referrer, city } = req.body;

  const event: DbVisit = {
    id: `vis_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    path: visitPath || '/',
    timestamp: new Date().toISOString(),
    device: device || 'mobile',
    referrer: referrer || 'Direct Visit',
    city: city || 'Odisha, IN'
  };

  db.visits.unshift(event);
  if (db.visits.length > 500) {
    db.visits = db.visits.slice(0, 500);
  }
  persistDatabase();

  res.status(200).json({ success: true });
});

app.get('/api/analytics', requireAdmin, (_req: Request, res: Response) => {
  let mobileCount = 0;
  let desktopCount = 0;
  let tabletCount = 0;
  const pathCounts: Record<string, number> = {};

  db.visits.forEach((v) => {
    if (v.device === 'mobile') mobileCount++;
    else if (v.device === 'tablet') tabletCount++;
    else desktopCount++;

    const p = v.path || '/';
    pathCounts[p] = (pathCounts[p] || 0) + 1;
  });

  const topPages = Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  res.json({
    totalVisitors: Math.max(1, Math.round(db.visits.length * 0.85)),
    pageViews: db.visits.length,
    recentVisits: db.visits.slice(0, 25),
    deviceBreakdown: {
      mobile: mobileCount,
      desktop: desktopCount,
      tablet: tabletCount
    },
    topPages: topPages.length > 0 ? topPages : [
      { path: '/', count: 1 }
    ]
  });
});

// -------------------------------------------------------------
// Real Gallery Endpoints (Private Vault & Public Toggle)
// -------------------------------------------------------------
app.get('/api/gallery/public', (_req: Request, res: Response) => {
  // Public visitors only receive photos with isPrivate: false
  const publicPhotos = db.photos.filter((p) => !p.isPrivate);
  res.json(publicPhotos);
});

app.get('/api/gallery/all', requireAdmin, (_req: Request, res: Response) => {
  // Admin receives all photos (including Private Vault items)
  res.json(db.photos);
});

app.post('/api/gallery/upload', requireAdmin, (req: Request, res: Response) => {
  const { title, category, categoryLabel, image, caption, isPrivate } = req.body;
  if (!title || !image) {
    res.status(400).json({ error: 'Photo title and image data are required' });
    return;
  }

  const user = (req as any).user;
  const newPhoto: DbPhoto = {
    id: `photo_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    title: title.trim(),
    category: category || 'resin',
    categoryLabel: categoryLabel || 'Resin Art',
    image,
    caption: caption ? caption.trim() : 'Studio creation',
    isPrivate: typeof isPrivate === 'boolean' ? isPrivate : true,
    createdAt: new Date().toISOString(),
    uploadedBy: user ? user.email : 'Studio Admin'
  };

  db.photos.unshift(newPhoto);
  persistDatabase();
  res.status(201).json(newPhoto);
});

app.patch('/api/gallery/:id/visibility', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { isPrivate } = req.body;

  const photo = db.photos.find((p) => p.id === id);
  if (!photo) {
    res.status(404).json({ error: 'Photo not found' });
    return;
  }

  photo.isPrivate = Boolean(isPrivate);
  persistDatabase();
  res.json({ success: true, photo });
});

app.delete('/api/gallery/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.photos.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Photo not found' });
    return;
  }

  db.photos.splice(index, 1);
  persistDatabase();
  res.json({ success: true });
});

// -------------------------------------------------------------
// Vite Server Mount / Static File Serving
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, () => {
    console.log(`Sangram Resin Art server running on http://localhost:${PORT}`);
  });
}

startServer();
