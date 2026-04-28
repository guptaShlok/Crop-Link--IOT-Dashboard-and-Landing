# Crop Link Setup Checklist

Complete this checklist to get Crop Link up and running.

---

## Phase 1: Local Development Setup ✓

### Dependencies
- [ ] Run `npm install` to install all dependencies
- [ ] Verify Firebase is installed: `npm list firebase`
- [ ] Check Node.js version is 18+: `node --version`

### Project Files
- [ ] Verify all source files exist in `/app`, `/components`, `/lib`
- [ ] Check `.env.example` exists as reference
- [ ] Review project structure in SETUP_INSTRUCTIONS.md

---

## Phase 2: Firebase Configuration

### Firebase Project Setup
- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Name the project: `crop-link`
- [ ] Wait for project creation to complete

### Authentication Setup
- [ ] In Firebase Console, go to **Authentication**
- [ ] Click **Sign-in method**
- [ ] Enable **Email/Password** provider
- [ ] (Optional) Enable **Anonymous** for testing

### Firebase Web App Registration
- [ ] Go to **Project Settings** (gear icon)
- [ ] Scroll to **Your apps** section
- [ ] Click **Web** icon (`</>`)
- [ ] App nickname: `crop-link-web`
- [ ] Uncheck **Firebase Hosting** (optional)
- [ ] Click **Register app**
- [ ] Copy the Firebase config object

### Environment Variables Setup
- [ ] Copy `.env.example` to `.env.local`
  ```bash
  cp .env.example .env.local
  ```
- [ ] Open `.env.local` in editor
- [ ] Fill in Firebase config values:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] Save `.env.local`

---

## Phase 3: MongoDB Setup (Optional - for Production)

### MongoDB Atlas Project
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Sign up or log in
- [ ] Create new project: `crop-link`
- [ ] Create a cluster (choose M0 Free tier)
- [ ] Wait for cluster deployment (10-15 minutes)

### Database User
- [ ] Click **Database Access** in left sidebar
- [ ] Click **Add New Database User**
- [ ] Username: `croplink_user` (or your choice)
- [ ] Generate password or create custom
- [ ] Save password securely
- [ ] Set **Database User Privileges** to **Atlas admin**
- [ ] Click **Add User**

### Network Access
- [ ] Go to **Network Access** in left sidebar
- [ ] Click **Add IP Address**
- [ ] Select **Allow access from anywhere** (for development)
- [ ] Click **Confirm**
- [ ] Note: For production, whitelist specific IPs

### Connection String
- [ ] Go to **Databases** and click your cluster
- [ ] Click **Connect**
- [ ] Select **Connect your application**
- [ ] Choose **Node.js** driver
- [ ] Copy connection string
- [ ] Update `.env.local`:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/croplink?retryWrites=true&w=majority
  ```
- [ ] Replace `<password>` with your database user password
- [ ] Save `.env.local`

### Create Collections (Optional)
- [ ] Go to **Collections** tab
- [ ] Click **Create Database**
- [ ] Database name: `croplink`
- [ ] Collection name: `devices`
- [ ] Click **Create** (will add more collections later)

---

## Phase 4: Local Testing

### Start Development Server
- [ ] Open terminal in project root
- [ ] Run: `npm run dev`
- [ ] Wait for "compiled successfully" message
- [ ] Open http://localhost:3000 in browser

### Test Landing Page
- [ ] Landing page loads with animations
- [ ] Navigation bar visible (Crop Link logo + Login/Sign Up buttons)
- [ ] Features section scrolls smoothly
- [ ] "How It Works" section displays
- [ ] CTA buttons are clickable

### Test Authentication
- [ ] Click **Get Started** button
- [ ] Should redirect to `/auth/signup`
- [ ] Try signing up with:
  - Email: `test@example.com`
  - Password: `TestPassword123!`
- [ ] Should redirect to dashboard after signup
- [ ] Check browser console for errors

### Test Login
- [ ] Click **Logout** button (top right)
- [ ] Should redirect to home page
- [ ] Click **Login** button
- [ ] Sign in with: `test@example.com` / `TestPassword123!`
- [ ] Should redirect to dashboard

### Test Dashboard
- [ ] Dashboard page loads with sidebar
- [ ] Navigation items visible: Dashboard, Devices, Analytics, Network, Alerts, Settings
- [ ] Clicking nav items changes the page
- [ ] Responsive: test on mobile size (< 768px)
- [ ] Sidebar collapses on small screens

---

## Phase 5: API Integration (Optional)

### Prepare API Routes
- [ ] Review `/app/api/devices/route.ts`
- [ ] Review `/app/api/sensor-data/route.ts`
- [ ] These files have TODO comments for MongoDB integration

### Update Devices Page
- [ ] Open `/app/dashboard/devices/page.tsx`
- [ ] Replace mock data fetch with real API call
- [ ] Use `useApi` hook from `/lib/use-api.ts`
- [ ] Example:
  ```typescript
  const { data: devices, loading } = useApi('/api/devices');
  ```

### Test API Calls
- [ ] In browser DevTools Network tab
- [ ] Try to fetch from `/api/devices`
- [ ] Should return mock data (for now)
- [ ] Should have Authorization header with token

---

## Phase 6: Customization

### Customize Settings
- [ ] Edit `/app/dashboard/settings/page.tsx`
- [ ] Update default threshold values
- [ ] Customize notification preferences

### Update Device Names
- [ ] Edit `/lib/mock-data.ts`
- [ ] Change device names to match your setup
- [ ] Add or remove devices as needed

### Customize Colors
- [ ] Edit `/app/globals.css`
- [ ] Update CSS custom properties (--primary, --secondary, etc.)
- [ ] Test theme colors on different pages

---

## Phase 7: Deployment (Optional)

### Prepare for Deployment
- [ ] Update `.env.local` values to production Firebase config
- [ ] Ensure MongoDB connection string works from production
- [ ] Test all features locally once more

### Deploy to Vercel
- [ ] Push code to GitHub repository
- [ ] Go to https://vercel.com/new
- [ ] Select your repository
- [ ] Add environment variables from `.env.local`
- [ ] Click **Deploy**
- [ ] Test deployed version at provided URL

### Post-Deployment
- [ ] Test Firebase auth with production config
- [ ] Verify MongoDB queries work
- [ ] Check alert notifications
- [ ] Monitor browser console for errors

---

## Phase 8: IoT Integration (Future)

### ESP32 + LoRa Setup
- [ ] [ ] Prepare ESP32 devices
- [ ] [ ] Program with LoRa firmware
- [ ] [ ] Set up LoRa gateway
- [ ] [ ] Configure data transmission

### Data Ingestion
- [ ] [ ] Create ingestion API endpoint
- [ ] [ ] Implement device authentication
- [ ] [ ] Set up data parsing
- [ ] [ ] Create MongoDB records

---

## Troubleshooting

### Firebase Not Working
```bash
# Clear Firebase cache
rm -rf node_modules/.cache
npm install

# Check env variables
cat .env.local
```

### MongoDB Connection Issues
```bash
# Test connection string
mongosh "your_connection_string"

# Check IP whitelist in MongoDB Atlas
```

### Dev Server Won't Start
```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

## Quick Reference

### Key URLs
- Landing Page: http://localhost:3000
- Login: http://localhost:3000/auth/login
- Sign Up: http://localhost:3000/auth/signup
- Dashboard: http://localhost:3000/dashboard
- Firebase Console: https://console.firebase.google.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

### Key Files to Update
1. `.env.local` - Environment variables
2. `/lib/mock-data.ts` - Device data
3. `/app/dashboard/page.tsx` - Dashboard content
4. `/app/globals.css` - Styling

### Useful Commands
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run linter
npm test          # Run tests (if configured)
```

---

## ✅ Completion

Once you've completed all sections:
1. Your Crop Link dashboard is ready for use
2. You can customize it further for your needs
3. You can deploy it to production
4. You can integrate real IoT devices

**Congratulations on setting up Crop Link! 🌾**
