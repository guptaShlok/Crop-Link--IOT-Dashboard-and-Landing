const { MongoClient } = require("mongodb");

const MONGODB_URI =
  "mongodb+srv://shlokofficial01_db_user:MsZUDXaW2mNdrC9o@cluster0.mztqjqy.mongodb.net/crop-link?retryWrites=true&w=majority";

const USER_ID = "YGVLe7WwzUcjMd2gw1FBDTRPmig2";
const DEVICE_ID = "DEVICE-TEMP-001";
const INTERVAL_MS = 5000;

function generateReading() {
  const hour = new Date().getHours();
  let baseTemp = 28.5;

  if (hour >= 6 && hour <= 14) baseTemp = 27.5 + (hour - 6) * 0.35;
  else if (hour > 14 && hour <= 18) baseTemp = 30.3 - (hour - 14) * 0.4;
  else baseTemp = 28 - Math.abs(hour - 12) * 0.1;

  const noise = (Math.random() - 0.5) * 1.2;
  const temperature = Math.max(27, Math.min(31, baseTemp + noise));

  return {
    userId: USER_ID,
    deviceId: DEVICE_ID,
    timestamp: new Date(),
    temperature: Math.round(temperature * 100) / 100,
    soilMoisture: Math.round((60 + Math.random() * 10) * 10) / 10,
    humidity: Math.round((65 + Math.random() * 10) * 10) / 10,
    ph: Math.round((6.6 + Math.random() * 0.4) * 100) / 100,
    createdAt: new Date(),
  };
}

async function run() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const collection = client.db("crop-link").collection("sensor-data");

  console.log("🌡️  Live temperature simulator running...");
  console.log(`   Inserting a new reading every ${INTERVAL_MS / 1000}s`);
  console.log(`   User: ${USER_ID}`);
  console.log("   Press Ctrl+C to stop\n");

  const insert = async () => {
    const reading = generateReading();
    await collection.insertOne(reading);
    console.log(
      `[${new Date().toLocaleTimeString()}] Inserted ${reading.temperature}°C  moisture:${reading.soilMoisture}%  humidity:${reading.humidity}%`
    );
  };

  await insert();
  const timer = setInterval(insert, INTERVAL_MS);

  process.on("SIGINT", async () => {
    clearInterval(timer);
    await client.close();
    console.log("\n✓ Simulator stopped.");
    process.exit(0);
  });
}

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
