import { Card, CardContent } from '@/components/ui/card';
import { Device } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { Battery, Thermometer, Droplets } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onClick?: () => void;
}

export function DeviceCard({ device, onClick }: DeviceCardProps) {
  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm">
                {device.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {device.location}
              </p>
            </div>
            <StatusBadge status={device.status} />
          </div>

          <div className="space-y-1.5 text-xs">
            {device.soilMoisture !== undefined && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Droplets className="w-3 h-3" />
                <span>Moisture: {device.soilMoisture}%</span>
              </div>
            )}
            {device.temperature !== undefined && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Thermometer className="w-3 h-3" />
                <span>Temp: {device.temperature}°C</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Battery className={`w-3 h-3 ${getBatteryColor(device.batteryLevel)}`} />
              <span className={getBatteryColor(device.batteryLevel)}>
                {device.batteryLevel}%
              </span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-1 border-t border-border">
            Last update: {device.lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
