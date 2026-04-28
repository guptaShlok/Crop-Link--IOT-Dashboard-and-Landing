"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, Wifi, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useApi, fetchWithAuth } from "@/lib/use-api";

interface Device {
  _id?: string;
  deviceId: string;
  userId: string;
  name: string;
  type: string;
  status: "online" | "offline" | "warning";
  batteryLevel: number;
  soilMoisture?: number;
  temperature?: number;
  location: string;
}

interface Alert {
  _id?: string;
  alertId: string;
  deviceId: string;
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "resolved";
  createdAt: string;
}

interface SensorReading {
  timestamp: string;
  soilMoisture: number;
  temperature: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch devices
        const devicesData = await fetchWithAuth<Device[]>("/api/devices", user);
        setDevices(devicesData);

        // Fetch sensor data for last 24 hours
        const sensorDataRes = await fetchWithAuth<any[]>(
          "/api/sensor-data?timeRange=24h",
          user,
        );

        // Group and average sensor data by hour for the chart
        const hourlyData: { [key: string]: any } = {};
        sensorDataRes.forEach((reading: any) => {
          const date = new Date(reading.timestamp);
          const hour = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          if (!hourlyData[hour]) {
            hourlyData[hour] = { time: hour, readings: [] };
          }
          hourlyData[hour].readings.push({
            moisture: reading.soilMoisture,
            temperature: reading.temperature,
          });
        });

        // Calculate averages
        const chartData = Object.values(hourlyData).map((group: any) => {
          const avgMoisture =
            group.readings.reduce(
              (sum: number, r: any) => sum + r.moisture,
              0,
            ) / group.readings.length;
          const avgTemp =
            group.readings.reduce(
              (sum: number, r: any) => sum + r.temperature,
              0,
            ) / group.readings.length;
          return {
            time: group.time,
            moisture: Math.round(avgMoisture * 10) / 10,
            temperature: Math.round(avgTemp * 10) / 10,
          };
        });
        setSensorData(chartData);

        // Fetch alerts
        const alertsData = await fetchWithAuth<Alert[]>("/api/alerts", user);
        setAlerts(alertsData);

        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;
  const activeAlerts = alerts.filter((a) => a.status === "active").length;

  const avgMoisture =
    devices.length > 0
      ? devices.reduce((sum, d) => sum + (d.soilMoisture || 0), 0) /
        devices.length
      : 0;

  const avgTemp =
    devices.length > 0
      ? devices.reduce((sum, d) => sum + (d.temperature || 0), 0) /
        devices.length
      : 0;

  const networkHealth =
    devices.length > 0 ? (onlineCount / devices.length) * 100 : 0;

  const chartData =
    sensorData.length > 0
      ? sensorData
      : [
          { time: "12:00", moisture: 58, temperature: 24 },
          { time: "13:00", moisture: 60, temperature: 25 },
          { time: "14:00", moisture: 62, temperature: 26 },
          { time: "15:00", moisture: 59, temperature: 27 },
          { time: "16:00", moisture: 61, temperature: 25 },
          { time: "17:00", moisture: 64, temperature: 24 },
        ];

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Loading...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real-time monitoring of your agricultural IoT network
        </p>
      </div>

      {error && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {devices.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {onlineCount} online, {offlineCount} offline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Soil Moisture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {avgMoisture.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Optimal range: 50-70%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {avgTemp.toFixed(1)}°C
            </div>
            <p className="text-xs text-muted-foreground mt-1">Field average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Network Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {networkHealth.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              System operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Active Alerts ({activeAlerts})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts
              .filter((a) => a.status === "active")
              .slice(0, 3)
              .map((alert) => (
                <div
                  key={alert.alertId}
                  className="p-3 rounded-lg bg-muted border border-border"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {alert.deviceId}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.message}
                      </p>
                    </div>
                    <Badge
                      variant={
                        alert.severity === "critical"
                          ? "destructive"
                          : alert.severity === "high"
                            ? "outline"
                            : "secondary"
                      }
                      className="shrink-0"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            {activeAlerts === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No active alerts
              </p>
            )}
          </CardContent>
        </Card>

        {/* Sensor Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Sensor Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="time"
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="moisture"
                  stroke="#3b82f6"
                  dot={false}
                  name="Soil Moisture (%)"
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  dot={false}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            Device Status ({devices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.slice(0, 6).map((device) => (
              <div
                key={device.deviceId}
                className="p-4 rounded-lg border border-border bg-muted/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-foreground text-sm">
                    {device.name}
                  </p>
                  <Badge
                    variant={
                      device.status === "online"
                        ? "default"
                        : device.status === "offline"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {device.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {device.location}
                </p>
                <div className="text-xs space-y-1">
                  {device.soilMoisture !== undefined && (
                    <p>
                      <span className="text-muted-foreground">Moisture:</span>{" "}
                      {device.soilMoisture.toFixed(1)}%
                    </p>
                  )}
                  {device.temperature !== undefined && (
                    <p>
                      <span className="text-muted-foreground">Temp:</span>{" "}
                      {device.temperature.toFixed(1)}°C
                    </p>
                  )}
                  <p>
                    <span className="text-muted-foreground">Battery:</span>{" "}
                    {device.batteryLevel}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
