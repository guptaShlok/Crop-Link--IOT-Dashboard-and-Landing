# Crop Link - Firebase & MongoDB Setup Guide

## Overview

Crop Link uses:
- **Firebase Authentication** for user login/signup and token management
- **MongoDB** for storing device data, sensor readings, and alerts
- **Firebase Cloud Functions** as middleware to sync data between Firebase and MongoDB

This document guides you through setting up both services.

---

## Part 1: Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `crop-link`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Firebase Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Enable **Anonymous** (optional, for testing)

### Step 3: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click **Web** icon to register a web app
4. Copy the Firebase config object

Your config will look like:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 4: Add Environment Variables

Create a `.env.local` file in the project root:

```env
# Firebase Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/croplink?retryWrites=true&w=majority

# Firebase Admin SDK (for server-side operations)
FIREBASE_ADMIN_SDK_KEY={"type":"service_account",...}
```

---

## Part 2: MongoDB Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new project: `Crop Link`
4. Create a cluster (M0 free tier)
5. Wait for cluster to be deployed (~10 minutes)

### Step 2: Create Database User

1. In MongoDB Atlas, go to **Database Access**
2. Click **Add New Database User**
3. Create username and password
4. Set privileges to **Atlas admin**
5. Create user

### Step 3: Get Connection String

1. Go to **Databases** > Your cluster
2. Click **Connect**
3. Select **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database password

Your connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/croplink?retryWrites=true&w=majority
```

### Step 4: Create Database Collections

#### Devices Collection
```javascript
db.createCollection("devices", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "userId", "name", "location"],
      properties: {
        _id: { bsonType: "objectId" },
        deviceId: { bsonType: "string" },
        userId: { bsonType: "string" },
        name: { bsonType: "string" },
        location: { bsonType: "string" },
        type: { bsonType: "string" },
        status: { enum: ["online", "offline", "error"] },
        lastUpdate: { bsonType: "date" },
        signalStrength: { bsonType: "int" },
        battery: { bsonType: "int" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});
```

#### Sensor Data Collection
```javascript
db.createCollection("sensorData", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        deviceId: { bsonType: "string" },
        userId: { bsonType: "string" },
        timestamp: { bsonType: "date" },
        soilMoisture: { bsonType: "double" },
        temperature: { bsonType: "double" },
        humidity: { bsonType: "double" },
        ph: { bsonType: "double" }
      }
    }
  }
});

// Create index for faster queries
db.sensorData.createIndex({ deviceId: 1, timestamp: -1 });
db.sensorData.createIndex({ userId: 1, timestamp: -1 });
```

#### Alerts Collection
```javascript
db.createCollection("alerts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "deviceId", "severity"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "string" },
        deviceId: { bsonType: "string" },
        type: { bsonType: "string" },
        severity: { enum: ["info", "warning", "critical"] },
        message: { bsonType: "string" },
        timestamp: { bsonType: "date" },
        resolved: { bsonType: "bool" },
        resolvedAt: { bsonType: "date" }
      }
    }
  }
});

db.alerts.createIndex({ userId: 1, timestamp: -1 });
```

---

## Part 3: Firebase Cloud Functions Setup

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

### Step 2: Create Middleware Function

Create `functions/src/index.ts`:

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { MongoClient } from 'mongodb';

admin.initializeApp();

const mongoUri = process.env.MONGODB_URI || '';
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  cachedDb = client.db('croplink');
  return cachedDb;
}

// Sync user data when registered
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  const db = await connectToDatabase();
  
  await db.collection('users').insertOne({
    uid: user.uid,
    email: user.email,
    createdAt: new Date(),
    updatedAt: new Date()
  });
});

// API endpoint to get devices
export const getDevices = functions.https.onRequest(async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    
    const db = await connectToDatabase();
    const devices = await db
      .collection('devices')
      .find({ userId })
      .toArray();
    
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get sensor data
export const getSensorData = functions.https.onRequest(async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const { deviceId, timeRange = '24h' } = req.query;
  
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    
    const db = await connectToDatabase();
    
    let startDate = new Date();
    if (timeRange === '7d') startDate.setDate(startDate.getDate() - 7);
    else if (timeRange === '30d') startDate.setDate(startDate.getDate() - 30);
    else startDate.setHours(startDate.getHours() - 24);
    
    const data = await db
      .collection('sensorData')
      .find({
        userId,
        deviceId,
        timestamp: { $gte: startDate }
      })
      .sort({ timestamp: -1 })
      .toArray();
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Step 3: Deploy Functions

```bash
firebase deploy --only functions
```

---

## Part 4: Using the API in Your App

### Example: Fetch Devices with Auth

```typescript
import { useAuth } from '@/lib/auth-context';

export function useDevices() {
  const { user } = useAuth();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDevices = async () => {
      const token = await user.getIdToken();
      const response = await fetch('/api/devices', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setDevices(data);
      setLoading(false);
    };

    fetchDevices();
  }, [user]);

  return { devices, loading };
}
```

---

## Part 5: Testing

### Test Firebase Authentication

1. Go to `http://localhost:3000`
2. Click "Get Started"
3. Sign up with email: `test@example.com`, password: `password123`
4. You should be redirected to dashboard

### Test MongoDB Connection

Add this to an API route to verify connection:

```typescript
export async function GET() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db('croplink');
    const collections = await db.listCollections().toArray();
    await client.close();
    
    return NextResponse.json({ collections });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## Troubleshooting

### Firebase Authentication Not Working
- Check environment variables in `.env.local`
- Ensure Firebase config is correct
- Verify email/password auth is enabled in Firebase console

### MongoDB Connection Failed
- Check connection string syntax
- Verify database user credentials
- Ensure IP address is whitelisted in MongoDB Atlas
- Check network access settings

### Cloud Functions Deployment Issues
- Ensure Blaze plan is enabled (Firebase requires this for Cloud Functions)
- Check Firebase CLI is logged in: `firebase login`
- Verify environment variables in `functions/.env`

---

## Next Steps

1. ✅ Set up Firebase project and authentication
2. ✅ Configure MongoDB Atlas and collections
3. ✅ Deploy Cloud Functions
4. ✅ Update API routes to fetch real data from MongoDB
5. Create data ingestion pipeline for IoT devices
6. Set up real-time updates with Firestore listeners

For more details, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
