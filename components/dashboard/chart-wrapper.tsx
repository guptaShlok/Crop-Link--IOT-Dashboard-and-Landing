import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
}

export function ChartWrapper({
  title,
  children,
  icon,
  description,
}: ChartWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <CardTitle>{title}</CardTitle>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
