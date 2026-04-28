import { Alert } from '@/lib/types';
import { Badge } from '@/components/ui/card';
import { AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import React from 'react';

interface AlertItemProps {
  alert: Alert;
  onClick?: () => void;
}

export function AlertItem({ alert, onClick }: AlertItemProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertOctagon className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'outline';
      case 'info':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div
      className="p-3 rounded-lg bg-muted border border-border hover:bg-muted/70 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          {getSeverityIcon(alert.severity)}
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {alert.deviceName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {alert.message}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {alert.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
