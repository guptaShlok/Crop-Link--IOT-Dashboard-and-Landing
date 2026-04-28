// Device and Sensor Types
export interface SensorReading {
  id: string;
  timestamp: Date;
  value: number;
  unit: string;
}

export interface Device {
  id: string;
  name: string;
  type: 'soil-sensor' | 'weather-station' | 'gateway';
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastUpdate: Date;
  batteryLevel: number;
  soilMoisture?: number;
  temperature?: number;
  humidity?: number;
  rssi?: number;
  snr?: number;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  isResolved: boolean;
}

export interface LoRaMetric {
  deviceId: string;
  deviceName: string;
  rssi: number; // Signal strength in dBm
  snr: number; // Signal-to-Noise Ratio in dB
  pdr: number; // Packet Delivery Rate in %
  latency: number; // Latency in ms
  lastUpdate: Date;
}

export interface ThresholdSettings {
  soilMoistureMin: number;
  soilMoistureMax: number;
  temperatureMin: number;
  temperatureMax: number;
  humidityMin: number;
  humidityMax: number;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  criticalOnly: boolean;
  dailyReport: boolean;
}
