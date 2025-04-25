import axios from 'axios';

// API base URL from environment variable, with fallback for local development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_KEY = process.env.API_KEY || 'development-key';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

// Types for API responses
export interface SensorData {
  _time: string;
  _value: number;
  _field: string;
  cottage_id: string;
  sensor_id: string;
}

export interface CarbonData {
  cottageId: string;
  timeframe: string;
  totalSequestration: number;
  unit: string;
  timestamp: string;
}

export interface VerificationData {
  cottageId: string;
  standard: string;
  certificationBody: string;
  timestamp: string;
  sequesteredCarbon: number;
  unit: string;
  verificationPeriod: string;
  metakaolin: boolean;
  reportHash: string;
  biogenicFactors: {
    hempHurd: number;
    limeBinder: number;
    timberFrame: number;
  };
}

// API functions
export const fetchSensorData = async (
  cottageId: string,
  sensorId: string,
  timeframe = '24h'
): Promise<SensorData[]> => {
  try {
    const response = await api.get(
      `/cottages/${cottageId}/data?sensorId=${sensorId}&start=-${timeframe}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  }
};

export const fetchCarbonData = async (
  cottageId: string,
  timeframe = '30d'
): Promise<CarbonData> => {
  try {
    const response = await api.get(
      `/cottages/${cottageId}/carbon?timeframe=${timeframe}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching carbon data:', error);
    throw error;
  }
};

export const fetchVerificationData = async (
  cottageId: string
): Promise<VerificationData> => {
  try {
    const response = await api.get(`/verification/${cottageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching verification data:', error);
    throw error;
  }
};

// Mock data for development/preview
export const getMockCottages = () => [
  { id: 'cottage-001', name: 'Demo Cottage', location: 'Saldus, Latvia' },
  { id: 'cottage-002', name: 'Hempcrete House 2', location: 'Riga, Latvia' },
  { id: 'cottage-003', name: 'Baltic Eco Lodge', location: 'Jurmala, Latvia' },
];

export default api; 