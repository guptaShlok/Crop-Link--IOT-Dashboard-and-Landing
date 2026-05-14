"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Wind,
  Leaf,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { fetchWithAuth } from "@/lib/use-api";

interface SensorReading {
  timestamp: string;
  soilMoisture: number;
  temperature: number;
  humidity?: number;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();

  const [sensorData, setSensorData] = useState<{ temperature: number; soilMoisture: number; humidity: number; ph: number } | null>(null);
  const [displayData, setDisplayData] = useState<typeof sensorData>(null);
  const [fading, setFading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sensorData) return;
    setFading(true);
    const t = setTimeout(() => {
      setDisplayData(sensorData);
      setFading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [sensorData]);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchSensorData = async () => {
      try {
        const res = await fetchWithAuth<any[]>("/api/sensor-data?timeRange=24h", user);
        if (res.length > 0) {
          const latest = res[res.length - 1];
          setSensorData({
            temperature: latest.temperature ?? 28,
            soilMoisture: latest.soilMoisture ?? 62,
            humidity: latest.humidity ?? 68,
            ph: latest.ph ?? 6.8,
          });
        } else {
          setSensorData({ temperature: 28, soilMoisture: 62, humidity: 68, ph: 6.8 });
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch sensor data");
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 4000);
    return () => clearInterval(interval);
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Please log in to view your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-4xl font-bold text-foreground">Field Monitor</h1>
        <p className="text-muted-foreground mt-2">
          Real-time agricultural field monitoring system
        </p>
      </div>

      {error && (
        <Card className="border border-red-500/30 bg-red-500/5">
          <CardContent className="pt-6">
            <p className="text-sm text-red-400 font-semibold">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* Live Temperature - PRIMARY CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-white/20 bg-gradient-to-br from-black/60 to-black/40">
          <CardHeader className="pb-6 border-b border-white/10">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-400" />
              Live Temperature Sensor
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin h-12 w-12 border-4 border-white/20 border-t-white/80 rounded-full" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">
                      Current Reading
                    </p>
                    <div className="flex items-end gap-2">
                      <div
                        className="text-7xl font-black text-white transition-opacity duration-300"
                        style={{ opacity: fading ? 0 : 1 }}
                      >
                        {displayData !== null ? displayData.temperature.toFixed(1) : "---"}
                      </div>
                      <span className="text-3xl text-muted-foreground mb-2">
                        °C
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        displayData !== null &&
                        displayData.temperature >= 27 &&
                        displayData.temperature <= 31
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                      }
                    >
                      {displayData !== null &&
                      displayData.temperature >= 27 &&
                      displayData.temperature <= 31
                        ? "Optimal"
                        : "Check Status"}
                    </Badge>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-full" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">Min</p>
                    <p className="text-lg font-semibold text-white">25°C</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">Avg</p>
                    <p className="text-lg font-semibold text-white">28°C</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">Max</p>
                    <p className="text-lg font-semibold text-white">31°C</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Summary */}
        <Card className="border border-white/20 bg-black/40">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-white">Sensors</p>
                <p className="text-xs text-muted-foreground">8 Active</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-white">Network</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm font-semibold text-white">Alerts</p>
                <p className="text-xs text-muted-foreground">2 Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agricultural KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Soil Moisture */}
        <Card className="border border-white/20 bg-black/40">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              Soil Moisture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl font-bold text-white transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {displayData !== null ? `${displayData.soilMoisture.toFixed(1)}%` : "---"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Optimal: 50-70%</p>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700"
                style={{ width: displayData ? `${Math.min(displayData.soilMoisture, 100)}%` : "0%" }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Humidity */}
        <Card className="border border-white/20 bg-black/40">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              Humidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl font-bold text-white transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {displayData !== null ? `${displayData.humidity.toFixed(1)}%` : "---"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Ideal: 60-80%</p>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-700"
                style={{ width: displayData ? `${Math.min(displayData.humidity, 100)}%` : "0%" }}
              />
            </div>
          </CardContent>
        </Card>

        {/* pH Level */}
        <Card className="border border-white/20 bg-black/40">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Leaf className="w-4 h-4 text-purple-400" />
              pH Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl font-bold text-white transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {displayData !== null ? displayData.ph.toFixed(2) : "---"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Range: 6.5-7.5</p>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-700"
                style={{ width: displayData ? `${((displayData.ph - 0) / 14) * 100}%` : "0%" }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Crop Health */}
        <Card className="border border-white/20 bg-black/40">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Crop Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">92%</div>
            <p className="text-xs text-muted-foreground mt-2">Good Condition</p>
            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                style={{ width: "92%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Field Map & Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-white/20 bg-black/40">
          <CardHeader className="pb-4 border-b border-white/10">
            <CardTitle className="text-lg font-bold">Field Zones</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["North", "Northeast", "East", "South", "Southwest", "West"].map(
                (zone) => (
                  <div
                    key={zone}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-white">
                      {zone} Zone
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Healthy
                    </p>
                    <div className="mt-2 inline-block px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs">
                      28°C
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Irrigation Schedule */}
        <Card className="border border-white/20 bg-black/40">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">
              Irrigation Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-sm font-semibold text-emerald-300">Active</p>
              <p className="text-xs text-muted-foreground mt-1">
                2h 45m remaining
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">
                Next Schedule
              </p>
              <p className="text-sm text-white">Tomorrow 6:00 AM</p>
            </div>
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Water Used (Today)
              </p>
              <p className="text-lg font-bold text-white">1,240 L</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="border border-white/20 bg-black/40">
        <CardHeader className="pb-4 border-b border-white/10">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Recent Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-yellow-300">
                    High Temperature Detected
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Zone: South - 31.2°C detected at 2:45 PM
                  </p>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  Warning
                </Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-300">
                    Soil Moisture Low
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Zone: West - Moisture at 45%, irrigation triggered
                  </p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Info
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
