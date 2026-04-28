'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockDevices, mockKPIs, mockAlerts, mockSensorData } from '@/lib/mock-data';
import { AlertCircle, Wifi, TrendingUp } from 'lucide-react';

const chartData = [
  { time: '12:00', moisture: 58, temperature: 24 },
  { time: '13:00', moisture: 60, temperature: 25 },
  { time: '14:00', moisture: 62, temperature: 26 },
  { time: '15:00', moisture: 59, temperature: 27 },
  { time: '16:00', moisture: 61, temperature: 25 },
  { time: '17:00', moisture: 64, temperature: 24 },
];

export default function DashboardPage() {
  const onlineCount = mockDevices.filter((d) => d.status === 'online').length;
  const criticalAlerts = mockAlerts.filter(
    (a) => a.severity === 'critical' && !a.isResolved
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real-time monitoring of your agricultural IoT network
        </p>
      </div>

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
              {mockKPIs.totalDevices}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {onlineCount} online, {mockKPIs.offlineDevices} offline
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
              {mockKPIs.averageSoilMoisture.toFixed(1)}%
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
              {mockKPIs.averageTemperature.toFixed(1)}°C
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Field average
            </p>
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
              {mockKPIs.networkHealth.toFixed(1)}%
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
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAlerts
              .filter((a) => !a.isResolved)
              .slice(0, 3)
              .map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg bg-muted border border-border"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {alert.deviceName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.message}
                      </p>
                    </div>
                    <Badge
                      variant={
                        alert.severity === 'critical'
                          ? 'destructive'
                          : alert.severity === 'warning'
                          ? 'outline'
                          : 'secondary'
                      }
                      className="shrink-0"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            {mockAlerts.filter((a) => !a.isResolved).length === 0 && (
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
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="time"
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
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
            Device Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDevices.slice(0, 6).map((device) => (
              <div
                key={device.id}
                className="p-4 rounded-lg border border-border bg-muted/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-foreground text-sm">
                    {device.name}
                  </p>
                  <Badge
                    variant={
                      device.status === 'online'
                        ? 'default'
                        : device.status === 'offline'
                        ? 'destructive'
                        : 'outline'
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
                      <span className="text-muted-foreground">Moisture:</span>{' '}
                      {device.soilMoisture}%
                    </p>
                  )}
                  {device.temperature !== undefined && (
                    <p>
                      <span className="text-muted-foreground">Temp:</span>{' '}
                      {device.temperature}°C
                    </p>
                  )}
                  <p>
                    <span className="text-muted-foreground">Battery:</span>{' '}
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
