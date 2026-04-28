import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { getCollection } from '@/lib/mongodb';
import { mockDevices } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
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

    // Fetch devices from MongoDB
    const devicesCollection = await getCollection('devices');
    const devices = await devicesCollection
      .find({ userId: decodedToken.uid })
      .toArray();

    // If no devices in DB, return mock data for demo
    if (devices.length === 0) {
      return NextResponse.json(mockDevices);
    }

    return NextResponse.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
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

    const body = await request.json();

    // Insert device into MongoDB
    const devicesCollection = await getCollection('devices');
    const device = {
      ...body,
      userId: decodedToken.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await devicesCollection.insertOne(device);
    
    return NextResponse.json(
      { message: 'Device created', data: { ...device, _id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating device:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
