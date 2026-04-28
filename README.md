# Crop Link - Smart Agriculture IoT Dashboard

A modern, full-stack web application for monitoring and managing agricultural IoT devices using LoRa technology. Built with Next.js, Firebase Authentication, MongoDB, and beautiful React components.

![Crop Link](https://img.shields.io/badge/Crop%20Link-Agriculture%20IoT-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌾 Features

### User-Friendly Interface
- Beautiful animated landing page with dynamic visuals
- Responsive design (desktop, tablet, mobile)
- Dark/Light theme support ready
- Intuitive sidebar navigation
- Real-time data visualizations

### Complete Dashboard
- **Dashboard**: KPI metrics, sensor trends, alerts overview
- **Devices**: Manage IoT devices with detailed information
- **Analytics**: Historical data analysis with customizable charts
- **Network**: LoRa network metrics (RSSI, SNR, PDR, latency)
- **Alerts**: Alert management with severity filtering
- **Settings**: Configure thresholds and preferences

### Robust Backend
- **Firebase Authentication**: Secure user management
- **MongoDB Integration**: Reliable data persistence
- **API Routes**: Protected endpoints with token verification
- **Real-Time Support**: Ready for WebSocket integration
- **Production-Ready**: Deployed on Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Firebase account (configured)
- MongoDB Atlas account (configured)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/crop-link.git
cd crop-link

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### First Steps
1. Visit the landing page at `/`
2. Sign up for an account at `/auth/signup`
3. Explore the dashboard at `/dashboard`
4. Try different pages using the sidebar navigation

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  Crop Link Frontend (Next.js React) │
│  • Landing Page                     │
│  • Dashboard Pages                  │
│  • Auth Forms                       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Firebase Authentication Layer     │
│   • Email/Password Auth             │
│   • Token Management                │
│   • User Session                    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   API Routes (Next.js)              │
│   • /api/devices                    │
│   • /api/sensor-data                │
│   • Token Verification              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   MongoDB Database                  │
│   • devices collection              │
│   • sensor-data collection          │
│   • alerts collection               │
│   • users collection                │
└─────────────────────────────────────┘
```

## 📁 Project Structure

```
crop-link/
├── app/
│   ├── api/                          # API routes
│   │   ├── devices/route.ts
│   │   └── sensor-data/route.ts
│   ├── auth/                         # Authentication pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/                    # Dashboard pages
│   │   ├── layout.tsx               # Sidebar layout
│   │   ├── page.tsx                 # Dashboard overview
│   │   ├── devices/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── network/page.tsx
│   │   ├── alerts/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing page
│   └── globals.css                   # Global styles
├── components/
│   ├── auth/                         # Auth components
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── dashboard/                    # Dashboard components
│   │   ├── metric-card.tsx
│   │   ├── status-badge.tsx
│   │   ├── device-card.tsx
│   │   ├── chart-wrapper.tsx
│   │   └── alert-item.tsx
│   ├── landing/                      # Landing page sections
│   │   ├── crop-link-landing.tsx
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   └── ...
│   └── ui/                           # shadcn/ui components
├── lib/
│   ├── firebase.ts                   # Firebase client config
│   ├── firebase-admin.ts             # Firebase admin SDK
│   ├── mongodb.ts                    # MongoDB connection
│   ├── auth-context.tsx              # Auth context provider
│   ├── use-api.ts                    # API hook
│   ├── types.ts                      # TypeScript types
│   └── mock-data.ts                  # Demo data
├── public/                           # Static assets
├── QUICKSTART.md                     # Quick start guide
├── INTEGRATION_GUIDE.md              # Firebase + MongoDB guide
├── DEPLOYMENT_READY.md               # Deployment checklist
├── MONGODB_COLLECTIONS.md            # Database schema
└── package.json
```

## 🔐 Authentication

### Setup
1. Firebase project configured: `crop-link-c2a70`
2. Email/password authentication enabled
3. All credentials embedded in config files

### How It Works
1. User signs up with email/password
2. Firebase creates authentication token
3. Token stored in browser
4. Token sent with API requests
5. Server verifies token with Firebase Admin SDK
6. User data retrieved from MongoDB

## 📊 API Documentation

### GET /api/devices
Fetch all devices for authenticated user.

**Headers**: `Authorization: Bearer <firebase_token>`

**Response**:
```json
[
  {
    "id": "DEVICE-001",
    "name": "North Field Sensor",
    "location": "North Field",
    "type": "LoRa Node",
    "status": "online",
    "sensors": {
      "soilMoisture": 65,
      "temperature": 24.5,
      "humidity": 78,
      "ph": 6.8
    }
  }
]
```

### GET /api/sensor-data
Fetch sensor readings with optional filters.

**Parameters**:
- `deviceId` (optional): Filter by device
- `timeRange` (optional): '24h', '7d', '30d'

**Response**:
```json
[
  {
    "timestamp": "2024-01-15T10:30:00Z",
    "deviceId": "DEVICE-001",
    "soilMoisture": 65,
    "temperature": 24.5,
    "humidity": 78,
    "ph": 6.8
  }
]
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **Tailwind CSS v4**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components
- **Recharts**: Data visualization
- **Firebase SDK**: Authentication

### Backend
- **Next.js API Routes**: Serverless functions
- **Firebase Admin SDK**: Token verification
- **MongoDB Node Driver**: Database driver
- **TypeScript**: Type safety

### Infrastructure
- **Vercel**: Hosting and deployment
- **Firebase**: Authentication service
- **MongoDB Atlas**: Database hosting
- **Git/GitHub**: Version control

## 🌐 Deployment

### Deploy to Vercel
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to https://vercel.com/new
# 3. Import your GitHub repository
# 4. Add environment variables
# 5. Deploy!
```

### Environment Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDYaHtGNBQopHrVmmrbMYnw5EoooIde_MU
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=crop-link-c2a70.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=crop-link-c2a70
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=crop-link-c2a70.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=92239229666
NEXT_PUBLIC_FIREBASE_APP_ID=1:92239229666:web:ae0cae8aaaf3e85ebc64bb
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-D7LG76XWSJ
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crop-link
```

## 📚 Documentation

- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **Integration Guide**: [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **MongoDB Collections**: [MONGODB_COLLECTIONS.md](./MONGODB_COLLECTIONS.md)
- **Deployment Guide**: [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Template theme and components
- Firebase for authentication
- MongoDB for database
- Vercel for hosting
- Next.js community
- shadcn/ui for beautiful components

## 📧 Support

For support, email support@croplink.io or open an issue on GitHub.

---

**Happy farming! 🌾** Build something amazing with Crop Link.
