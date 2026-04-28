'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from 'recharts';
import { mockDevices, mockSensorData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown } from 'lucide-react';

const analyticsData = [
  { time: '00:00', moisture: 45, temp: 18, humidity: 65 },
  { time: '04:00', moisture: 42, temp: 15, humidity: 68 },
  { time: '08:00', moisture: 48, temp: 20, humidity: 62 },
  { time: '12:00', moisture: 62, temp: 28, humidity: 55 },
  { time: '16:00', moisture: 65, temp: 32, humidity: 48 },
  { time: '20:00', moisture: 55, temp: 22, humidity: 60 },
  { time: '24:00', moisture: 50, temp: 19, humidity: 66 },
];

export default function AnalyticsPage() {
  const [selectedDevice, setSelectedDevice] = useState('device-001');
  const [timeRange, setTimeRange] = useState('24h');

  const sensorDevices = mockDevices.filter((d) => d.type !== 'gateway');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Historical sensor data and trends
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground block mb-2">
            Device
          </label>
          <Select value={selectedDevice} onValueChange={setSelectedDevice}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sensorDevices.map((device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground block mb-2">
            Time Range
          </label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        {/* Soil Moisture Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Soil Moisture Trend</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="moisture"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorMoisture)"
                  name="Soil Moisture (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Temperature & Humidity Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Temperature & Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={analyticsData}>
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
                  }}
                />
                <Legend />
                <Bar dataKey="temp" fill="#ef4444" name="Temperature (°C)" />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#06b6d4"
                  name="Humidity (%)"
                  yAxisId="right"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparison across multiple devices */}
        <Card>
          <CardHeader>
            <CardTitle>All Devices Moisture Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
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
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="moisture"
                  stroke="#3b82f6"
                  dot={false}
                  name="Avg Moisture"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Moisture (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">54.6%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="w-3 h-3 inline text-green-500 mr-1" />
              +2.3% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Temperature (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5°C</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingDown className="w-3 h-3 inline text-red-500 mr-1" />
              -1.2°C from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data Points Collected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,582</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all devices
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
