# MongoDB Collections Guide for Crop Link

This guide shows the exact structure of MongoDB collections needed for Crop Link.

---

## Overview

Crop Link uses 4 main collections in MongoDB:
1. **devices** - Registered IoT sensor nodes
2. **sensorData** - Time-series sensor readings
3. **alerts** - Alert events and notifications
4. **users** - User profiles (created by Firebase)

---

## 1. Devices Collection

Stores information about LoRa sensor nodes deployed in fields.

### Schema

```json
{
  "_id": ObjectId,
  "deviceId": "string (unique)",
  "userId": "string (Firebase UID)",
  "name": "string",
  "location": "string",
  "type": "string (LoRa Node, Gateway, etc)",
  "status": "string (online, offline, error)",
  "lastUpdate": ISODate,
  "signalStrength": number (RSSI in dBm, -140 to 0),
  "battery": number (0-100),
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "deviceId": "DEVICE-001",
  "userId": "firebase_user_123",
  "name": "North Field Sensor",
  "location": "North Field",
  "type": "LoRa Node",
  "status": "online",
  "lastUpdate": ISODate("2024-04-28T14:30:00Z"),
  "signalStrength": -95,
  "battery": 87,
  "createdAt": ISODate("2024-04-20T10:00:00Z"),
  "updatedAt": ISODate("2024-04-28T14:30:00Z")
}
```

### Create Collection with Validation

```javascript
db.createCollection("devices", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "userId", "name", "location", "status"],
      properties: {
        _id: { bsonType: "objectId" },
        deviceId: { 
          bsonType: "string",
          description: "Unique device identifier"
        },
        userId: { 
          bsonType: "string",
          description: "Firebase user ID who owns this device"
        },
        name: { 
          bsonType: "string",
          description: "Device display name"
        },
        location: { 
          bsonType: "string",
          description: "Physical location of device"
        },
        type: { 
          bsonType: "string",
          enum: ["LoRa Node", "Gateway", "Repeater"]
        },
        status: { 
          bsonType: "string",
          enum: ["online", "offline", "error", "maintenance"]
        },
        lastUpdate: { bsonType: "date" },
        signalStrength: { 
          bsonType: "int",
          minimum: -140,
          maximum: 0
        },
        battery: { 
          bsonType: "int",
          minimum: 0,
          maximum: 100
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create indexes
db.devices.createIndex({ userId: 1 });
db.devices.createIndex({ deviceId: 1 }, { unique: true });
db.devices.createIndex({ userId: 1, createdAt: -1 });
```

---

## 2. Sensor Data Collection

Stores time-series sensor readings from IoT devices.

### Schema

```json
{
  "_id": ObjectId,
  "deviceId": "string",
  "userId": "string (Firebase UID)",
  "timestamp": ISODate,
  "soilMoisture": number (0-100, percentage),
  "temperature": number (Celsius),
  "humidity": number (0-100, percentage),
  "ph": number (0-14),
  "metadata": {
    "rssi": number,
    "snr": number,
    "spreadingFactor": number
  }
}
```

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "deviceId": "DEVICE-001",
  "userId": "firebase_user_123",
  "timestamp": ISODate("2024-04-28T14:35:00Z"),
  "soilMoisture": 65.5,
  "temperature": 24.3,
  "humidity": 78.2,
  "ph": 6.8,
  "metadata": {
    "rssi": -95,
    "snr": 7,
    "spreadingFactor": 7
  }
}
```

### Create Collection with Validation

```javascript
db.createCollection("sensorData", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "userId", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        deviceId: { bsonType: "string" },
        userId: { bsonType: "string" },
        timestamp: { 
          bsonType: "date",
          description: "When the reading was recorded"
        },
        soilMoisture: { 
          bsonType: "double",
          minimum: 0,
          maximum: 100
        },
        temperature: { 
          bsonType: "double",
          minimum: -50,
          maximum: 150
        },
        humidity: { 
          bsonType: "double",
          minimum: 0,
          maximum: 100
        },
        ph: { 
          bsonType: "double",
          minimum: 0,
          maximum: 14
        },
        metadata: { 
          bsonType: "object",
          properties: {
            rssi: { bsonType: "int" },
            snr: { bsonType: "int" },
            spreadingFactor: { bsonType: "int" }
          }
        }
      }
    }
  }
});

// Create indexes for fast queries
db.sensorData.createIndex({ deviceId: 1, timestamp: -1 });
db.sensorData.createIndex({ userId: 1, timestamp: -1 });
db.sensorData.createIndex({ timestamp: 1 }, { expireAfterSeconds: 7776000 }); // 90 days TTL
```

### Time-Series Data Query Examples

```javascript
// Get last 24 hours of data for a device
db.sensorData.find({
  deviceId: "DEVICE-001",
  timestamp: {
    $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  }
}).sort({ timestamp: -1 });

// Average temperature for a device
db.sensorData.aggregate([
  {
    $match: {
      deviceId: "DEVICE-001",
      timestamp: {
        $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      }
    }
  },
  {
    $group: {
      _id: null,
      avgTemp: { $avg: "$temperature" },
      minTemp: { $min: "$temperature" },
      maxTemp: { $max: "$temperature" }
    }
  }
]);
```

---

## 3. Alerts Collection

Stores alert events triggered by sensor readings.

### Schema

```json
{
  "_id": ObjectId,
  "userId": "string (Firebase UID)",
  "deviceId": "string",
  "type": "string",
  "severity": "string (info, warning, critical)",
  "message": "string",
  "timestamp": ISODate,
  "resolved": boolean,
  "resolvedAt": ISODate,
  "resolvedBy": "string (user who resolved)",
  "threshold": {
    "metric": "string",
    "value": number,
    "actual": number
  }
}
```

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "userId": "firebase_user_123",
  "deviceId": "DEVICE-001",
  "type": "soil_moisture_low",
  "severity": "warning",
  "message": "Soil moisture dropped below 40%",
  "timestamp": ISODate("2024-04-28T14:35:00Z"),
  "resolved": false,
  "resolvedAt": null,
  "resolvedBy": null,
  "threshold": {
    "metric": "soilMoisture",
    "value": 40,
    "actual": 35.2
  }
}
```

### Create Collection with Validation

```javascript
db.createCollection("alerts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "deviceId", "type", "severity", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "string" },
        deviceId: { bsonType: "string" },
        type: { 
          bsonType: "string",
          enum: [
            "soil_moisture_low",
            "soil_moisture_high",
            "temperature_low",
            "temperature_high",
            "humidity_low",
            "humidity_high",
            "ph_low",
            "ph_high",
            "device_offline",
            "battery_low",
            "signal_weak"
          ]
        },
        severity: { 
          bsonType: "string",
          enum: ["info", "warning", "critical"]
        },
        message: { bsonType: "string" },
        timestamp: { bsonType: "date" },
        resolved: { bsonType: "bool" },
        resolvedAt: { bsonType: ["date", "null"] },
        resolvedBy: { bsonType: ["string", "null"] },
        threshold: { 
          bsonType: "object",
          properties: {
            metric: { bsonType: "string" },
            value: { bsonType: "double" },
            actual: { bsonType: "double" }
          }
        }
      }
    }
  }
});

// Create indexes
db.alerts.createIndex({ userId: 1, timestamp: -1 });
db.alerts.createIndex({ deviceId: 1, timestamp: -1 });
db.alerts.createIndex({ severity: 1, resolved: 1 });
```

### Alert Query Examples

```javascript
// Get unresolved alerts for a user
db.alerts.find({
  userId: "firebase_user_123",
  resolved: false
}).sort({ timestamp: -1 });

// Get critical alerts from last 7 days
db.alerts.find({
  userId: "firebase_user_123",
  severity: "critical",
  timestamp: {
    $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  }
}).sort({ timestamp: -1 });

// Count alerts by type
db.alerts.aggregate([
  { $match: { userId: "firebase_user_123", resolved: false } },
  { $group: { _id: "$type", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
```

---

## 4. Users Collection

Stores user profile information (created automatically by Firebase).

### Schema

```json
{
  "_id": ObjectId,
  "uid": "string (Firebase UID, unique)",
  "email": "string (unique)",
  "displayName": "string",
  "photoURL": "string",
  "role": "string (admin, user, viewer)",
  "settings": {
    "soilMoistureMin": number,
    "soilMoistureMax": number,
    "temperatureMin": number,
    "temperatureMax": number,
    "humidityMin": number,
    "humidityMax": number,
    "phMin": number,
    "phMax": number,
    "enableNotifications": boolean,
    "theme": "string"
  },
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### Example Document

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "uid": "firebase_user_123",
  "email": "farmer@example.com",
  "displayName": "John Farmer",
  "photoURL": "https://...",
  "role": "admin",
  "settings": {
    "soilMoistureMin": 30,
    "soilMoistureMax": 80,
    "temperatureMin": 15,
    "temperatureMax": 35,
    "humidityMin": 40,
    "humidityMax": 90,
    "phMin": 6.0,
    "phMax": 7.5,
    "enableNotifications": true,
    "theme": "dark"
  },
  "createdAt": ISODate("2024-04-20T10:00:00Z"),
  "updatedAt": ISODate("2024-04-28T14:30:00Z")
}
```

### Create Collection

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["uid", "email"],
      properties: {
        _id: { bsonType: "objectId" },
        uid: { 
          bsonType: "string",
          description: "Firebase UID"
        },
        email: { bsonType: "string" },
        displayName: { bsonType: ["string", "null"] },
        photoURL: { bsonType: ["string", "null"] },
        role: { 
          bsonType: "string",
          enum: ["admin", "user", "viewer"]
        },
        settings: { 
          bsonType: "object",
          properties: {
            soilMoistureMin: { bsonType: "double" },
            soilMoistureMax: { bsonType: "double" },
            temperatureMin: { bsonType: "double" },
            temperatureMax: { bsonType: "double" },
            humidityMin: { bsonType: "double" },
            humidityMax: { bsonType: "double" },
            phMin: { bsonType: "double" },
            phMax: { bsonType: "double" },
            enableNotifications: { bsonType: "bool" },
            theme: { bsonType: "string" }
          }
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create unique index on uid
db.users.createIndex({ uid: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });
```

---

## Data Relationships

```
users
  ├── _id (ObjectId)
  └── uid (Firebase UID)

devices
  ├── userId → users.uid
  └── deviceId (unique per user)

sensorData
  ├── userId → users.uid
  ├── deviceId → devices.deviceId
  └── timestamp (for time-series queries)

alerts
  ├── userId → users.uid
  ├── deviceId → devices.deviceId
  └── type (based on sensor thresholds)
```

---

## Database Setup Script

To set up all collections at once, run in MongoDB Atlas shell:

```javascript
// Create databases and collections
use croplink;

// 1. Create users collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["uid", "email"],
      properties: {
        _id: { bsonType: "objectId" },
        uid: { bsonType: "string" },
        email: { bsonType: "string" },
        displayName: { bsonType: ["string", "null"] },
        role: { bsonType: "string", enum: ["admin", "user", "viewer"] },
        settings: { bsonType: "object" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});
db.users.createIndex({ uid: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });

// 2. Create devices collection
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
        status: { bsonType: "string", enum: ["online", "offline", "error"] },
        lastUpdate: { bsonType: "date" },
        signalStrength: { bsonType: "int" },
        battery: { bsonType: "int" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});
db.devices.createIndex({ userId: 1 });
db.devices.createIndex({ deviceId: 1 }, { unique: true });

// 3. Create sensorData collection
db.createCollection("sensorData", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "userId", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        deviceId: { bsonType: "string" },
        userId: { bsonType: "string" },
        timestamp: { bsonType: "date" },
        soilMoisture: { bsonType: "double" },
        temperature: { bsonType: "double" },
        humidity: { bsonType: "double" },
        ph: { bsonType: "double" },
        metadata: { bsonType: "object" }
      }
    }
  }
});
db.sensorData.createIndex({ deviceId: 1, timestamp: -1 });
db.sensorData.createIndex({ userId: 1, timestamp: -1 });

// 4. Create alerts collection
db.createCollection("alerts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "deviceId", "type", "severity", "timestamp"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "string" },
        deviceId: { bsonType: "string" },
        type: { bsonType: "string" },
        severity: { bsonType: "string", enum: ["info", "warning", "critical"] },
        message: { bsonType: "string" },
        timestamp: { bsonType: "date" },
        resolved: { bsonType: "bool" },
        threshold: { bsonType: "object" }
      }
    }
  }
});
db.alerts.createIndex({ userId: 1, timestamp: -1 });
db.alerts.createIndex({ deviceId: 1, timestamp: -1 });

console.log("✅ All collections created successfully!");
```

---

## Index Strategy

Indexes are crucial for performance. Here's why each index exists:

| Collection | Index | Purpose |
|-----------|-------|---------|
| users | uid | Fast user lookups by Firebase UID |
| users | email | Fast user lookup by email |
| devices | userId | List all devices for a user |
| devices | deviceId | Ensure unique devices |
| sensorData | deviceId, timestamp | Fetch readings for a device in time range |
| sensorData | userId, timestamp | Fetch all user readings by date |
| sensorData | timestamp (TTL) | Automatically delete old data after 90 days |
| alerts | userId, timestamp | List user's alerts in reverse chronological order |
| alerts | severity, resolved | Filter alerts by status and severity |

---

## Migration & Backup

### Backup Data

```bash
# Backup all collections
mongodump --uri="mongodb+srv://..." --out="./backup"

# Backup single collection
mongodump --uri="mongodb+srv://..." --collection=devices --out="./backup"
```

### Restore Data

```bash
# Restore all collections
mongorestore --uri="mongodb+srv://..." "./backup"

# Restore single collection
mongorestore --uri="mongodb+srv://..." --collection=devices "./backup"
```

---

## Performance Tips

1. **Use Indexes**: Always query on indexed fields
2. **Limit Results**: Use `.limit()` for large queries
3. **Batch Operations**: Bulk insert instead of individual inserts
4. **TTL Indexes**: Auto-delete old sensor data
5. **Archive**: Move old data to archive collection

---

For more MongoDB documentation, visit: https://docs.mongodb.com/
