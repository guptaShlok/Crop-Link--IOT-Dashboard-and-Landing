# Crop Link - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### 1. Start the Dev Server
```bash
npm run dev
```
The app will be available at **http://localhost:3000**

### 2. Visit Landing Page
Open http://localhost:3000 in your browser. You'll see:
- Beautiful animated landing page
- Sign up / Login buttons
- Feature overview
- Farm illustrations and metrics

### 3. Create an Account
1. Click "Get Started" or navigate to `/auth/signup`
2. Enter your email and password
3. Click "Sign up"
4. Automatically redirected to dashboard

### 4. Explore the Dashboard
Navigate using the sidebar:

| Page | What You'll See |
|------|-----------------|
| **Dashboard** | KPI metrics, sensor trends, active alerts |
| **Devices** | List of IoT devices with click-to-expand details |
| **Analytics** | Historical charts with date range filtering |
| **Network** | LoRa signal metrics (RSSI, SNR, PDR) |
| **Alerts** | Alert events with severity filtering |
| **Settings** | Configure thresholds and preferences |

### 5. View Mock Data
The dashboard displays realistic mock data by default:
- 3 sensor devices (North Field, South Field, East Field)
- Sample sensor readings (soil moisture, temperature, humidity, pH)
- Historical data for the past 24 hours
- Network quality metrics

## 📊 What You're Looking At

### Dashboard Overview
```
┌─────────────────────────────────────┐
│ Crop Link Dashboard (Authenticated) │
├──────────────┬──────────────────────┤
│              │                      │
│   Sidebar    │   Main Content       │
│              │                      │
│  • Dashboard │  • KPI Cards         │
│  • Devices   │  • Live Charts       │
│  • Analytics │  • Alert Summary     │
│  • Network   │  • Device Status     │
│  • Alerts    │                      │
│  • Settings  │                      │
└──────────────┴──────────────────────┘
```

### Sensor Data Example
Each device shows:
- **Soil Moisture**: 40-70% (irrigation trigger at 40%)
- **Temperature**: 20-30°C
- **Humidity**: 60-90%
- **pH Level**: 6.5-7.5 (optimal for crops)

## 🔐 Authentication Flow

```
Landing Page
    ↓
Signup/Login (Firebase)
    ↓
Token Generated
    ↓
Dashboard (Protected)
    ↓
API Calls with Token
    ↓
MongoDB Data Retrieved
```

## 🛠️ Key Components

### Frontend
- **Next.js 16**: React framework with server components
- **shadcn/ui**: Pre-built accessible components
- **Tailwind CSS**: Utility-first styling (matches template theme)
- **Firebase SDK**: Real-time authentication

### Backend
- **Next.js API Routes**: `/api/devices`, `/api/sensor-data`
- **Firebase Admin SDK**: Token verification
- **MongoDB**: Data storage
- **Node.js**: Runtime environment

## 📱 Responsive Design

The app works on:
- ✅ Desktop (1920px and up)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

Sidebar collapses on mobile for better UX.

## 🔄 Data Flow Example

### Fetching Device Data
```
1. User opens Dashboard
2. Auth context provides Firebase token
3. useAuth() hook gets user
4. GET /api/devices (with token)
5. API verifies token with Firebase
6. MongoDB queries devices collection
7. Returns user-specific devices
8. Components render data
9. Charts display sensor trends
```

## 📚 Important Files

```
lib/
├── firebase.ts          ← Firebase client config
├── firebase-admin.ts    ← Firebase server SDK
├── mongodb.ts           ← MongoDB connection
├── auth-context.tsx     ← Auth state management
└── mock-data.ts         ← Demo data

app/
├── auth/                ← Login/signup pages
├── dashboard/           ← Dashboard layout
└── api/                 ← API routes (devices, sensor-data)

components/
├── auth/                ← Auth forms
├── dashboard/           ← Dashboard components
└── landing/             ← Landing page
```

## 🧪 Testing the API

Get a token from login, then test API:

```bash
# Get devices
curl -H "Authorization: Bearer <your_token>" \
  http://localhost:3000/api/devices

# Get sensor data (24h)
curl -H "Authorization: Bearer <your_token>" \
  "http://localhost:3000/api/sensor-data?timeRange=24h"

# Get data for specific device
curl -H "Authorization: Bearer <your_token>" \
  "http://localhost:3000/api/sensor-data?deviceId=DEVICE-001&timeRange=7d"
```

## ⚙️ Configuration

### Firebase (Already Configured)
- Project: `crop-link-c2a70`
- Auth: Email/password enabled
- Database: Real-time DB available

### MongoDB (Already Configured)
- Cluster: `cluster0`
- Database: `crop-link`
- Collections: `devices`, `sensor-data`, `alerts`, `users`

### Credentials (Already in Code)
All credentials are embedded in:
- `/lib/firebase.ts` - Client config
- `/lib/firebase-admin.ts` - Admin SDK
- `/lib/mongodb.ts` - MongoDB URI

## 🎨 Customization

### Theme Colors
Edit `/app/globals.css`:
```css
@theme inline {
  --color-primary: ...
  --color-secondary: ...
  --color-accent: ...
}
```

### Add New Device
POST to `/api/devices`:
```json
{
  "name": "West Field Sensor",
  "location": "West Field",
  "type": "LoRa Node"
}
```

### Add Sensor Reading
POST to `/api/sensor-data`:
```json
{
  "deviceId": "DEVICE-001",
  "soilMoisture": 65,
  "temperature": 24.5,
  "humidity": 78,
  "ph": 6.8
}
```

## 📈 Next Steps

1. **Add Real Devices**: Connect LoRa gateway to send data
2. **Custom Charts**: Modify analytics to show your metrics
3. **Notifications**: Add email alerts for low soil moisture
4. **User Management**: Create admin panel for multi-user
5. **Mobile App**: Build React Native version
6. **Deploy**: Push to Vercel for production

## 🚨 Troubleshooting

**"Firebase error"**: Check Firebase is initialized in `/lib/firebase.ts`

**"MongoDB timeout"**: Verify connection string in `/lib/mongodb.ts`

**"Unauthorized API call"**: Ensure Bearer token is in Authorization header

**"Can't sign up"**: Check Firebase Authentication is enabled

## 💡 Pro Tips

- Mock data shows when no real data exists in MongoDB
- Firebase tokens expire in 1 hour (auto-refreshed)
- MongoDB connections are cached for performance
- Charts automatically update with new sensor readings
- Responsive design tested on all device sizes

## 📖 Full Documentation

- **Integration Guide**: `/INTEGRATION_GUIDE.md`
- **Setup Instructions**: `/SETUP_INSTRUCTIONS.md`
- **MongoDB Collections**: `/MONGODB_COLLECTIONS.md`
- **Deployment**: `/DEPLOYMENT_READY.md`

---

**You're all set!** Start building your smart agriculture platform. 🌾
