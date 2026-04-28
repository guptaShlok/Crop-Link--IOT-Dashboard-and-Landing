# Crop Link - Smart Agriculture IoT Dashboard

## Quick Start Guide

Welcome to **Crop Link**, a comprehensive smart agriculture IoT monitoring platform built with Next.js, Firebase, and MongoDB.

---

## 🚀 Features

- **Real-time Monitoring**: Track soil moisture, temperature, humidity, and pH levels across your fields
- **LoRa Network Management**: Monitor signal strength (RSSI), SNR, and packet delivery rates
- **Beautiful Dashboard**: Responsive design with dark theme and interactive charts
- **Firebase Authentication**: Secure email/password authentication
- **MongoDB Integration**: Store and query historical sensor data
- **Alert Management**: Get notified when values exceed thresholds
- **Device Management**: Register and monitor multiple LoRa nodes
- **Analytics**: View trends and historical data with time-range filtering

---

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- A Firebase project (free tier available)
- MongoDB Atlas account (free tier M0 available)
- Git (for version control)

---

## 🔧 Installation & Setup

### Step 1: Clone and Install Dependencies

```bash
# Install project dependencies
npm install

# or with pnpm
pnpm install
```

### Step 2: Configure Firebase

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Create a new project
   - Enable Authentication > Email/Password

2. **Get Firebase Config**
   - Go to Project Settings > General
   - Scroll to "Your apps" and register a web app
   - Copy the Firebase config

3. **Create .env.local**
   ```bash
   cp .env.example .env.local
   ```

4. **Add Firebase Credentials**
   Edit `.env.local` and add your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### Step 3: Configure MongoDB (Optional for Production)

1. **Create MongoDB Atlas Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free M0 cluster
   - Create database user
   - Get connection string

2. **Add MongoDB URI to .env.local**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/croplink
   ```

### Step 4: Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

---

## 🎯 Usage

### Landing Page
- Visit home page to see Crop Link features
- Click "Get Started" to create an account

### Authentication
- **Sign Up**: Create new account with email/password
- **Login**: Sign in to access the dashboard
- **Demo Account** (for testing): test@example.com / password123

### Dashboard Features

#### 1. Dashboard (Home)
- View real-time KPI metrics
- See active alerts
- Monitor sensor trends
- Device status overview

#### 2. Devices
- View all connected LoRa nodes
- Click on a device to see details
- Monitor signal strength and battery level
- View latest sensor readings

#### 3. Analytics
- Historical sensor data visualization
- Filter by device and time range
- Compare multiple sensors
- Export data for analysis

#### 4. Network
- LoRa network health metrics
- RSSI (signal strength) trends
- SNR (signal-to-noise ratio) analysis
- Packet delivery rate (PDR)
- Network latency monitoring

#### 5. Alerts
- Manage active and resolved alerts
- Filter by severity (Info, Warning, Critical)
- View alert timeline
- Mark alerts as resolved

#### 6. Settings
- Configure alert thresholds
- Set notification preferences
- Manage device settings
- User profile management

---

## 📊 Database Schema

### Collections in MongoDB

#### devices
```json
{
  "_id": "ObjectId",
  "deviceId": "DEVICE-001",
  "userId": "firebase_uid",
  "name": "North Field Sensor",
  "location": "North Field",
  "type": "LoRa Node",
  "status": "online",
  "lastUpdate": "2024-04-28T...",
  "signalStrength": -95,
  "battery": 85,
  "createdAt": "2024-04-28T..."
}
```

#### sensorData
```json
{
  "_id": "ObjectId",
  "deviceId": "DEVICE-001",
  "userId": "firebase_uid",
  "timestamp": "2024-04-28T...",
  "soilMoisture": 65.5,
  "temperature": 24.5,
  "humidity": 78,
  "ph": 6.8
}
```

#### alerts
```json
{
  "_id": "ObjectId",
  "userId": "firebase_uid",
  "deviceId": "DEVICE-001",
  "type": "soil_moisture_low",
  "severity": "warning",
  "message": "Soil moisture below threshold",
  "timestamp": "2024-04-28T...",
  "resolved": false
}
```

---

## 🔗 API Endpoints

All API endpoints require Firebase authentication token in header:

```
Authorization: Bearer <firebase_id_token>
```

### Devices
- `GET /api/devices` - Get all user's devices
- `POST /api/devices` - Create new device

### Sensor Data
- `GET /api/sensor-data?deviceId=DEVICE-001&timeRange=24h` - Get sensor readings

### Alerts
- `GET /api/alerts` - Get all alerts
- `POST /api/alerts` - Create new alert

---

## 🎨 Styling & Theme

Crop Link uses:
- **Tailwind CSS v4** for styling
- **Dark theme** with emerald and blue accents
- **Responsive design** (mobile, tablet, desktop)
- **Custom animations** for smooth interactions
- **shadcn/ui** components for consistency

Color palette:
- Primary: Emerald (#10b981)
- Secondary: Blue (#3b82f6)
- Background: Slate (#0f172a)
- Text: Slate (#f1f5f9)

---

## 📁 Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   ├── page.tsx             # Dashboard home
│   │   ├── devices/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── network/page.tsx
│   │   ├── alerts/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── devices/route.ts
│       ├── sensor-data/route.ts
│       └── alerts/route.ts
├── components/
│   ├── landing/
│   │   ├── crop-link-landing.tsx # Landing page
│   │   └── [other sections]
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── dashboard/
│   │   ├── metric-card.tsx
│   │   ├── status-badge.tsx
│   │   ├── device-card.tsx
│   │   ├── chart-wrapper.tsx
│   │   └── alert-item.tsx
│   └── ui/
│       └── [shadcn/ui components]
├── lib/
│   ├── firebase.ts              # Firebase config
│   ├── auth-context.tsx         # Auth provider
│   ├── types.ts                 # TypeScript types
│   └── mock-data.ts             # Mock data
├── public/
│   └── [static assets]
├── FIREBASE_MONGODB_SETUP.md    # Detailed setup guide
├── SETUP_INSTRUCTIONS.md        # This file
└── .env.example                 # Environment variables template
```

---

## 🔐 Security

- Firebase authentication for secure user management
- Environment variables for sensitive data (never commit .env.local)
- Database indexes for optimal query performance
- Input validation and error handling
- CORS protection on API routes

---

## 🚢 Deployment

### Deploy to Vercel

```bash
# Push code to GitHub
git push origin main

# Connect repository to Vercel
# https://vercel.com/new

# Add environment variables in Vercel project settings
# Deploy!
```

### MongoDB Atlas Whitelist
- Add your Vercel deployment IP to MongoDB Atlas whitelist
- MongoDB Atlas > Network Access > Add IP Address

---

## 🆘 Troubleshooting

### Firebase Authentication Not Working
- ✓ Check `NEXT_PUBLIC_FIREBASE_*` env variables
- ✓ Verify Firebase project exists and is active
- ✓ Ensure Email/Password auth is enabled
- ✓ Check browser console for errors

### MongoDB Connection Issues
- ✓ Verify `MONGODB_URI` is correct
- ✓ Check database user credentials
- ✓ Whitelist your IP in MongoDB Atlas
- ✓ Ensure database name matches in connection string

### Dashboard Not Loading
- ✓ Check network tab in DevTools
- ✓ Verify user is authenticated (check localStorage for Firebase token)
- ✓ Check API endpoint is responding
- ✓ Look for console errors

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 🎓 Next Steps

1. ✅ Set up Firebase & MongoDB
2. ✅ Customize alert thresholds
3. ⏳ Deploy IoT devices (ESP32 + LoRa)
4. ⏳ Set up data ingestion pipeline
5. ⏳ Configure real-time alerts
6. ⏳ Add user management & team features

---

## 📝 Notes

- **Mock Data**: Currently using mock data. Update API routes to connect to MongoDB
- **Real-time Updates**: Consider adding Socket.io or Firebase Realtime Database for live updates
- **Offline Support**: Consider adding service workers for offline functionality
- **Mobile App**: Use React Native for mobile version

---

## 🤝 Support

For issues, questions, or suggestions:
1. Check the FIREBASE_MONGODB_SETUP.md for detailed configuration
2. Review console logs for error messages
3. Check troubleshooting section above

---

## 📄 License

This project is built with v0.app by Vercel. See LICENSE file for details.

---

**Happy farming with Crop Link! 🌾**
