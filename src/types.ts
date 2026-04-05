export interface FarmerProfile {
  id: string;
  name: string;
  location: string;
  crops: string[];
}

export interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  location: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  forecast: string;
}

export interface TokenVaultConnection {
  provider: string;
  status: 'connected' | 'disconnected';
  lastSynced?: string;
}
