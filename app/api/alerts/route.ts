import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { getCollection } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const status = request.nextUrl.searchParams.get("status");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    let decodedToken;

    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Query MongoDB for alerts
    const alertsCollection = await getCollection("alerts");
    const query: any = { userId: decodedToken.uid };

    if (status) {
      query.status = status;
    }

    const alerts = await alertsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    let decodedToken;

    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();

    // Insert alert into MongoDB
    const alertsCollection = await getCollection("alerts");
    const alert = {
      ...body,
      userId: decodedToken.uid,
      createdAt: new Date(),
      status: "active",
    };

    const result = await alertsCollection.insertOne(alert);

    return NextResponse.json(
      { message: "Alert created", data: { ...alert, _id: result.insertedId } },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
