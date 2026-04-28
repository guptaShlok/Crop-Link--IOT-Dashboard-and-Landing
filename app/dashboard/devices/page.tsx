'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockDevices } from '@/lib/mock-data';
import { Device } from '@/lib/types';
import { ChevronRight, Wifi, Battery } from 'lucide-react';

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'default';
      case 'offline':
        return 'destructive';
      case 'warning':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Devices</h1>
        <p className="text-muted-foreground mt-1">
          Manage and monitor all connected IoT devices
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDevices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {mockDevices.filter((d) => d.status === 'online').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {mockDevices.filter((d) => d.status !== 'online').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Devices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Device List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Battery</TableHead>
                  <TableHead className="text-right">Last Update</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {device.type.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {device.location}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(device.status)}>
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Battery
                          className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`}
                        />
                        <span>{device.batteryLevel}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {device.lastUpdate.toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDevice(device)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Device Detail Dialog */}
      <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDevice?.name}</DialogTitle>
            <DialogDescription>{selectedDevice?.location}</DialogDescription>
          </DialogHeader>
          {selectedDevice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={getStatusColor(selectedDevice.status)}
                    className="mt-1"
                  >
                    {selectedDevice.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium mt-1">
                    {selectedDevice.type.replace('-', ' ')}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Battery Level</span>
                  <span className="font-medium">{selectedDevice.batteryLevel}%</span>
                </div>
                {selectedDevice.rssi !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signal Strength (RSSI)</span>
                    <span className="font-medium">{selectedDevice.rssi} dBm</span>
                  </div>
                )}
                {selectedDevice.snr !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signal-to-Noise Ratio</span>
                    <span className="font-medium">{selectedDevice.snr} dB</span>
                  </div>
                )}
                {selectedDevice.soilMoisture !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Soil Moisture</span>
                    <span className="font-medium">{selectedDevice.soilMoisture}%</span>
                  </div>
                )}
                {selectedDevice.temperature !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className="font-medium">{selectedDevice.temperature}°C</span>
                  </div>
                )}
                {selectedDevice.humidity !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Humidity</span>
                    <span className="font-medium">{selectedDevice.humidity}%</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Last Update</p>
                <p className="font-medium mt-1">
                  {selectedDevice.lastUpdate.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
