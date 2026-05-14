'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from 'recharts';
import { mockLoRaMetrics, mockDevices } from '@/lib/mock-data';
import { Radio, Signal, TrendingUp, Zap } from 'lucide-react';

const signalData = [
  { device: 'Device 1', rssi: -85, snr: 8.5 },
  { device: 'Device 2', rssi: -92, snr: 6.2 },
  { device: 'Device 3', rssi: -75, snr: 10.8 },
  { device: 'Device 4', rssi: -105, snr: 3.1 },
];

const pdrData = [
  { device: 'Device 1', pdr: 98.5 },
  { device: 'Device 2', pdr: 95.2 },
  { device: 'Device 3', pdr: 99.8 },
  { device: 'Device 4', pdr: 72.3 },
];

const latencyData = [
  { time: '12:00', latency: 45 },
  { time: '13:00', latency: 48 },
  { time: '14:00', latency: 52 },
  { time: '15:00', latency: 50 },
  { time: '16:00', latency: 55 },
  { time: '17:00', latency: 58 },
];

export default function NetworkPage() {
  const getSignalQuality = (rssi: number) => {
    if (rssi > -80) return { text: 'Excellent', color: 'default' };
    if (rssi > -90) return { text: 'Good', color: 'secondary' };
    if (rssi > -100) return { text: 'Fair', color: 'outline' };
    return { text: 'Poor', color: 'destructive' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Network</h1>
        <p className="text-white/50 mt-1">
          LoRa network performance and metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-white/10 bg-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/50 flex items-center gap-2">
              <Signal className="w-4 h-4" />
              Avg. Signal Strength
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">-89 dBm</div>
            <p className="text-xs text-white/50 mt-1">Good coverage</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/50 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Avg. SNR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7.1 dB</div>
            <p className="text-xs text-white/50 mt-1">Signal quality</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/50 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Avg. PDR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">91.5%</div>
            <p className="text-xs text-white/50 mt-1">Delivery rate</p>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/50 flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Avg. Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">58 ms</div>
            <p className="text-xs text-white/50 mt-1">Network delay</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="space-y-6">
        {/* Signal Strength vs SNR */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Signal Strength vs Signal-to-Noise Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={signalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="rssi"
                  name="RSSI (dBm)"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  type="number"
                  domain={[-120, -60]}
                />
                <YAxis
                  dataKey="snr"
                  name="SNR (dB)"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Scatter
                  name="Devices"
                  data={signalData}
                  fill="#3b82f6"
                  dataKey="snr"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Packet Delivery Rate */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Packet Delivery Rate (PDR) by Device</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pdrData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="device"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="pdr" fill="#10b981" name="PDR (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Latency Trend */}
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Network Latency Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="time"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#f59e0b"
                  dot={false}
                  name="Latency (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Network Details Table */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">LoRa Device Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/60">Device</TableHead>
                  <TableHead className="text-right text-white/60">RSSI (dBm)</TableHead>
                  <TableHead className="text-right text-white/60">SNR (dB)</TableHead>
                  <TableHead className="text-right text-white/60">PDR (%)</TableHead>
                  <TableHead className="text-right text-white/60">Latency (ms)</TableHead>
                  <TableHead className="text-white/60">Signal Quality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLoRaMetrics.map((metric) => (
                  <TableRow key={metric.deviceId} className="border-white/10">
                    <TableCell className="font-medium text-white">{metric.deviceName}</TableCell>
                    <TableCell className="text-right text-white/80">{metric.rssi}</TableCell>
                    <TableCell className="text-right text-white/80">{metric.snr.toFixed(1)}</TableCell>
                    <TableCell className="text-right text-white/80">{metric.pdr.toFixed(1)}</TableCell>
                    <TableCell className="text-right text-white/80">{metric.latency}</TableCell>
                    <TableCell>
                      <Badge variant={getSignalQuality(metric.rssi).color as any}>
                        {getSignalQuality(metric.rssi).text}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
