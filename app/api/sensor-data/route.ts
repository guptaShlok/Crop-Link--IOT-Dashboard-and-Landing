import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { getCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const deviceId = request.nextUrl.searchParams.get('deviceId');
    const timeRange = request.nextUrl.searchParams.get('timeRange') || '24h';

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decodedToken;
    
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Calculate time range
    const now = new Date();
    let startTime = new Date();
    
    switch (timeRange) {
      case '24h':
        startTime.setHours(startTime.getHours() - 24);
        break;
      case '7d':
        startTime.setDate(startTime.getDate() - 7);
        break;
      case '30d':
        startTime.setDate(startTime.getDate() - 30);
        break;
      default:
        startTime.setHours(startTime.getHours() - 24);
    }

    // Query MongoDB for sensor data
    const sensorCollection = await getCollection('sensor-data');
    const query: any = {
      userId: decodedToken.uid,
      timestamp: { $gte: startTime }
    };

    if (deviceId) {
      query.deviceId = deviceId;
    }

    const data = await sensorCollection
      .find(query)
      .sort({ timestamp: 1 })
      .toArray();

    // If no data in DB, generate mock data for demo
    if (data.length === 0) {
      const mockData = [];
      const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
      
      for (let i = hours; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000);
        mockData.push({
          timestamp: time.toISOString(),
          deviceId: deviceId || 'DEVICE-001',
          soilMoisture: 45 + Math.random() * 30,
          temperature: 20 + Math.random() * 10,
          humidity: 60 + Math.random() * 30,
          ph: 6.5 + Math.random() * 1
        });
      }
      return NextResponse.json(mockData);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
