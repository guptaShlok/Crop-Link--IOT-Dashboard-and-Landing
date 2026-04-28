# Crop Link - Firebase & MongoDB Integration Guide

## Overview

Crop Link uses **Firebase Authentication** as the middleware layer and **MongoDB** as the primary database for storing agricultural IoT sensor data.

## Architecture

```
┌─────────────────────┐
│   Crop Link UI      │ (Next.js React)
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│ Firebase Auth       │ (User Authentication & Token Management)
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   API Routes        │ (Next.js Route Handlers)
│  (/api/devices,     │
│   /api/sensor-data) │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│    MongoDB          │ (Data Persistence)
│   Collections:      │
│  - devices          │
│  - sensor-data      │
│  - alerts           │
│  - users            │
└─────────────────────┘
```

## Setup Instructions

### 1. Firebase Configuration

Your Firebase project is already configured with the following credentials:

- **Project ID**: crop-link-c2a70
- **Auth Domain**: crop-link-c2a70.firebaseapp.com
- **Database URL**: https://crop-link-c2a70-default-rtdb.asia-southeast1.firebasedatabase.app
- **Storage Bucket**: crop-link-c2a70.firebasestorage.app

The configuration is embedded in `/lib/firebase.ts` and `/lib/firebase-admin.ts`.

### 2. MongoDB Configuration

Your MongoDB cluster connection string:
```
mongodb+srv://shlokofficial01_db_user:MsZUDXaW2mNdrC9o@cluster0.mztqjqy.mongodb.net/
```

Database name: `crop-link`

The connection is established in `/lib/mongodb.ts`.

### 3. Available Collections

#### devices
Stores IoT device information:
```json
{
  "_id": ObjectId,
  "userId": "firebase_uid",
  "id": "DEVICE-001",
  "name": "North Field Sensor",
  "location": "North Field",
  "type": "LoRa Node",
  "status": "online",
  "lastUpdate": "2024-01-15T10:30:00Z",
  "sensors": {
    "soilMoisture": 65,
    "temperature": 24.5,
    "humidity": 78,
    "ph": 6.8
  },
  "signalStrength": -95,
  "battery": 85,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### sensor-data
Stores time-series sensor readings:
```json
{
  "_id": ObjectId,
  "userId": "firebase_uid",
  "deviceId": "DEVICE-001",
  "timestamp": "2024-01-15T10:30:00Z",
  "soilMoisture": 65,
  "temperature": 24.5,
  "humidity": 78,
  "ph": 6.8,
  "signalStrength": -95,
  "battery": 85
}
```

#### alerts
Stores alert events:
```json
{
  "_id": ObjectId,
  "userId": "firebase_uid",
  "deviceId": "DEVICE-001",
  "type": "MOISTURE_LOW",
  "severity": "warning",
  "message": "Soil moisture is below threshold",
  "timestamp": "2024-01-15T10:30:00Z",
  "status": "active",
  "acknowledgedAt": null
}
```

#### users
Stores user profile information:
```json
{
  "_id": ObjectId,
  "uid": "firebase_uid",
  "email": "user@example.com",
  "displayName": "John Doe",
  "farmName": "Green Valley Farm",
  "location": "California",
  "preferences": {
    "moistureThreshold": 40,
    "temperatureThreshold": 30,
    "humidityThreshold": 80
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## API Endpoints

### Authentication

All API endpoints require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase_id_token>
```

### GET /api/devices
Fetch all devices for the authenticated user.

**Request**:
```bash
curl -H "Authorization: Bearer <token>" \
  https://localhost:3000/api/devices
```

**Response**:
```json
[
  {
    "id": "DEVICE-001",
    "name": "North Field Sensor",
    "status": "online",
    ...
  }
]
```

### POST /api/devices
Create a new device.

**Request**:
```bash
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "East Field Sensor",
    "location": "East Field",
    "type": "LoRa Node"
  }' \
  https://localhost:3000/api/devices
```

**Response**:
```json
{
  "message": "Device created",
  "data": {
    "_id": "...",
    "id": "DEVICE-003",
    "name": "East Field Sensor",
    ...
  }
}
```

### GET /api/sensor-data
Fetch sensor readings with optional filters.

**Parameters**:
- `deviceId` (optional): Filter by device ID
- `timeRange` (optional): '24h', '7d', '30d' (default: '24h')

**Request**:
```bash
curl -H "Authorization: Bearer <token>" \
  "https://localhost:3000/api/sensor-data?deviceId=DEVICE-001&timeRange=24h"
```

**Response**:
```json
[
  {
    "timestamp": "2024-01-15T09:00:00Z",
    "deviceId": "DEVICE-001",
    "soilMoisture": 65,
    "temperature": 24.5,
    "humidity": 78,
    "ph": 6.8
  }
]
```

## How Data Flows

### 1. User Registration
```
User → Firebase Auth → Firebase creates UID → User document created in MongoDB
```

### 2. Device Addition
```
User (Dashboard) → POST /api/devices → Firebase token verified → Device saved to MongoDB
```

### 3. Sensor Data Collection
```
LoRa Gateway → POST /api/sensor-data → Firebase token verified → Data stored in MongoDB
Dashboard polls → GET /api/sensor-data → MongoDB query → Charts display data
```

## Development Mode

### Start Dev Server
```bash
npm run dev
```

### Access the Application
- **Landing Page**: http://localhost:3000
- **Login**: http://localhost:3000/auth/login
- **Signup**: http://localhost:3000/auth/signup
- **Dashboard**: http://localhost:3000/dashboard (requires authentication)

### Testing with Mock Data

When you log in, the application will:
1. Attempt to fetch devices from MongoDB using your Firebase UID
2. If no devices exist in MongoDB, it returns mock data from `/lib/mock-data.ts`
3. This allows you to test the UI without pre-populated data

## Production Deployment

### Environment Variables (for Vercel)

Add these to your Vercel project settings:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDYaHtGNBQopHrVmmrbMYnw5EoooIde_MU
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=crop-link-c2a70.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=crop-link-c2a70
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=crop-link-c2a70.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=92239229666
NEXT_PUBLIC_FIREBASE_APP_ID=1:92239229666:web:ae0cae8aaaf3e85ebc64bb
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-D7LG76XWSJ
MONGODB_URI=mongodb+srv://shlokofficial01_db_user:MsZUDXaW2mNdrC9o@cluster0.mztqjqy.mongodb.net/
```

### Security Notes

⚠️ **Important**: In production, consider:
- Moving sensitive credentials to environment variables
- Using MongoDB Atlas IP whitelist
- Enabling Firebase security rules
- Using HTTPS only
- Implementing rate limiting on API endpoints
- Adding input validation and sanitization
- Monitoring and logging authentication events

## Troubleshooting

### "Firebase app not initialized"
- Check `/lib/firebase.ts` configuration
- Ensure Firebase SDK is installed: `npm install firebase`

### "MongoDB connection timeout"
- Verify MongoDB Atlas IP whitelist includes your deployment server
- Check connection string syntax
- Ensure `mongodb` package is installed: `npm install mongodb`

### "Token verification failed"
- Verify the Authorization header format: `Bearer <token>`
- Check Firebase Admin SDK initialization
- Ensure token is fresh (tokens expire in 1 hour)

### "Document not found in MongoDB"
- Check if userId filter is correct
- Verify user record exists in MongoDB
- Check MongoDB Atlas network access settings

## Next Steps

1. **Add more sensor types** to the data schema
2. **Implement real-time updates** using WebSockets or Firebase Realtime Database
3. **Add data export** functionality (CSV, JSON)
4. **Implement notification system** for alerts
5. **Add advanced analytics** and historical trend analysis
6. **Mobile app** using React Native with same Firebase/MongoDB backend

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Crop Link Dashboard UI Components](./components)
