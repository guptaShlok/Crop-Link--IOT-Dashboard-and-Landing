'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ThresholdSettings, NotificationSettings } from '@/lib/types';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [thresholds, setThresholds] = useState<ThresholdSettings>({
    soilMoistureMin: 40,
    soilMoistureMax: 80,
    temperatureMin: 15,
    temperatureMax: 35,
    humidityMin: 30,
    humidityMax: 90,
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailAlerts: true,
    criticalOnly: false,
    dailyReport: true,
  });

  const [saveMessage, setSaveMessage] = useState('');

  const handleThresholdChange = (key: keyof ThresholdSettings, value: number) => {
    setThresholds((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNotificationChange = (
    key: keyof NotificationSettings,
    value: boolean
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure thresholds and notifications
        </p>
      </div>

      {/* Save Status */}
      {saveMessage && (
        <Card className="bg-green-500/10 border-green-500/30">
          <CardContent className="pt-6">
            <p className="text-sm text-green-700">{saveMessage}</p>
          </CardContent>
        </Card>
      )}

      {/* Threshold Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Sensor Thresholds</CardTitle>
          <CardDescription>
            Set alert thresholds for sensor readings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Soil Moisture */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Soil Moisture (%)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soil-min" className="text-muted-foreground">
                  Minimum Threshold
                </Label>
                <Input
                  id="soil-min"
                  type="number"
                  min="0"
                  max="100"
                  value={thresholds.soilMoistureMin}
                  onChange={(e) =>
                    handleThresholdChange(
                      'soilMoistureMin',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="soil-max" className="text-muted-foreground">
                  Maximum Threshold
                </Label>
                <Input
                  id="soil-max"
                  type="number"
                  min="0"
                  max="100"
                  value={thresholds.soilMoistureMax}
                  onChange={(e) =>
                    handleThresholdChange(
                      'soilMoistureMax',
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-2"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Alert triggered when soil moisture falls below minimum or exceeds maximum
            </p>
          </div>

          <Separator />

          {/* Temperature */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Temperature (°C)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="temp-min" className="text-muted-foreground">
                  Minimum Threshold
                </Label>
                <Input
                  id="temp-min"
                  type="number"
                  min="-50"
                  max="50"
                  value={thresholds.temperatureMin}
                  onChange={(e) =>
                    handleThresholdChange('temperatureMin', parseInt(e.target.value))
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="temp-max" className="text-muted-foreground">
                  Maximum Threshold
                </Label>
                <Input
                  id="temp-max"
                  type="number"
                  min="-50"
                  max="50"
                  value={thresholds.temperatureMax}
                  onChange={(e) =>
                    handleThresholdChange('temperatureMax', parseInt(e.target.value))
                  }
                  className="mt-2"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Alert triggered when temperature drops below minimum or rises above maximum
            </p>
          </div>

          <Separator />

          {/* Humidity */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Humidity (%)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="humidity-min" className="text-muted-foreground">
                  Minimum Threshold
                </Label>
                <Input
                  id="humidity-min"
                  type="number"
                  min="0"
                  max="100"
                  value={thresholds.humidityMin}
                  onChange={(e) =>
                    handleThresholdChange('humidityMin', parseInt(e.target.value))
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="humidity-max" className="text-muted-foreground">
                  Maximum Threshold
                </Label>
                <Input
                  id="humidity-max"
                  type="number"
                  min="0"
                  max="100"
                  value={thresholds.humidityMax}
                  onChange={(e) =>
                    handleThresholdChange('humidityMax', parseInt(e.target.value))
                  }
                  className="mt-2"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Alert triggered when humidity falls below minimum or exceeds maximum
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how and when you receive alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="email-alerts" className="text-foreground font-medium">
                Email Alerts
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive email notifications for alerts
              </p>
            </div>
            <Switch
              id="email-alerts"
              checked={notifications.emailAlerts}
              onCheckedChange={(checked) =>
                handleNotificationChange('emailAlerts', checked)
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="critical-only" className="text-foreground font-medium">
                Critical Alerts Only
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Only notify for critical severity alerts
              </p>
            </div>
            <Switch
              id="critical-only"
              checked={notifications.criticalOnly}
              onCheckedChange={(checked) =>
                handleNotificationChange('criticalOnly', checked)
              }
              disabled={!notifications.emailAlerts}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="daily-report" className="text-foreground font-medium">
                Daily Report
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive a daily summary report at 8:00 AM
              </p>
            </div>
            <Switch
              id="daily-report"
              checked={notifications.dailyReport}
              onCheckedChange={(checked) =>
                handleNotificationChange('dailyReport', checked)
              }
              disabled={!notifications.emailAlerts}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">System Version</span>
            <span className="font-medium">v1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">2024-04-15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Database Status</span>
            <span className="font-medium text-green-500">Connected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">LoRa Gateway Status</span>
            <span className="font-medium text-green-500">Online</span>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
