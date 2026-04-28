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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAlerts } from '@/lib/mock-data';
import { Alert as AlertType } from '@/lib/types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function AlertsPage() {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<string>>(new Set());

  const filteredAlerts = mockAlerts.filter((alert) => {
    const severityMatch =
      filterSeverity === 'all' || alert.severity === filterSeverity;
    const statusMatch =
      filterStatus === 'active'
        ? !alert.isResolved && !resolvedAlerts.has(alert.id)
        : alert.isResolved || resolvedAlerts.has(alert.id);
    return severityMatch && statusMatch;
  });

  const handleResolve = (alertId: string) => {
    const newResolved = new Set(resolvedAlerts);
    newResolved.add(alertId);
    setResolvedAlerts(newResolved);
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

  const criticalCount = mockAlerts.filter(
    (a) => a.severity === 'critical' && !a.isResolved
  ).length;
  const warningCount = mockAlerts.filter(
    (a) => a.severity === 'warning' && !a.isResolved
  ).length;
  const infoCount = mockAlerts.filter(
    (a) => a.severity === 'info' && !a.isResolved
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
        <p className="text-muted-foreground mt-1">
          Device alerts and notifications
        </p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{criticalCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Require immediate action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{warningCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Monitor closely</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500" />
              Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{infoCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Informational</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground block mb-2">
            Severity
          </label>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-foreground block mb-2">
            Status
          </label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Alert History ({filteredAlerts.length} alert
            {filteredAlerts.length !== 1 ? 's' : ''})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                {filterStatus === 'active'
                  ? 'No active alerts - system is healthy!'
                  : 'No resolved alerts to display'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => {
                    const isResolved =
                      alert.isResolved || resolvedAlerts.has(alert.id);
                    return (
                      <TableRow
                        key={alert.id}
                        className={isResolved ? 'opacity-60' : ''}
                      >
                        <TableCell className="font-medium">
                          {alert.deviceName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {alert.message}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {alert.timestamp.toLocaleTimeString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {isResolved ? (
                            <Badge variant="outline" className="bg-green-500/10">
                              Resolved
                            </Badge>
                          ) : (
                            <Badge>Active</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!isResolved && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleResolve(alert.id)}
                            >
                              Resolve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAlerts.slice(0, 5).map((alert, idx) => (
              <div key={alert.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      alert.severity === 'critical'
                        ? 'bg-red-500'
                        : alert.severity === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  {idx !== mockAlerts.length - 1 && (
                    <div className="w-0.5 h-8 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium text-foreground">
                    {alert.deviceName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.timestamp.toLocaleString()}
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
