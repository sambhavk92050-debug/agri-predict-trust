// Mock data for the agricultural portal

export interface CropData {
  id: string;
  cropType: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  currentStage: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  predictedYield: number;
  actualYield?: number;
  location: string;
  area: number; // in acres
  verified: boolean;
}

export interface WeatherData {
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  soilMoisture: number;
  uvIndex: number;
}

export interface PredictionData {
  cropId: string;
  confidence: number;
  yieldPrediction: number;
  riskFactors: string[];
  recommendations: string[];
  optimizations: {
    water: number;
    fertilizer: number;
    pesticide: number;
  };
}

export interface RegionalData {
  region: string;
  totalFarms: number;
  totalArea: number;
  avgYield: number;
  majorCrops: string[];
  foodSecurity: 'high' | 'medium' | 'low';
  climateRisk: number;
}

export interface MarketData {
  crop: string;
  currentPrice: number;
  priceChange: number;
  demand: 'high' | 'medium' | 'low';
  supply: 'surplus' | 'balanced' | 'deficit';
  forecast: number[];
}

// Mock crop data
export const mockCrops: CropData[] = [
  {
    id: '1',
    cropType: 'Wheat',
    variety: 'HD-2967',
    plantingDate: '2024-11-15',
    expectedHarvest: '2025-04-15',
    currentStage: 'Tillering',
    healthStatus: 'excellent',
    predictedYield: 45.2,
    location: 'Punjab, India',
    area: 25.5,
    verified: true
  },
  {
    id: '2',
    cropType: 'Rice',
    variety: 'Basmati-370',
    plantingDate: '2024-06-20',
    expectedHarvest: '2024-11-20',
    currentStage: 'Harvested',
    healthStatus: 'good',
    predictedYield: 38.7,
    actualYield: 36.2,
    location: 'Haryana, India',
    area: 18.3,
    verified: true
  },
  {
    id: '3',
    cropType: 'Corn',
    variety: 'Pioneer-3394',
    plantingDate: '2024-03-10',
    expectedHarvest: '2024-08-15',
    currentStage: 'Harvested',
    healthStatus: 'fair',
    predictedYield: 42.1,
    actualYield: 39.8,
    location: 'Uttar Pradesh, India',
    area: 12.7,
    verified: false
  }
];

// Mock weather data (last 30 days)
export const mockWeatherData: WeatherData[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  temperature: 18 + Math.random() * 15,
  humidity: 45 + Math.random() * 40,
  rainfall: Math.random() < 0.3 ? Math.random() * 25 : 0,
  soilMoisture: 30 + Math.random() * 40,
  uvIndex: 3 + Math.random() * 5
}));

// Mock predictions
export const mockPredictions: Record<string, PredictionData> = {
  '1': {
    cropId: '1',
    confidence: 92,
    yieldPrediction: 45.2,
    riskFactors: ['Late season frost risk', 'Rust disease potential'],
    recommendations: [
      'Apply nitrogen fertilizer in next 10 days',
      'Monitor for rust symptoms',
      'Ensure adequate irrigation during grain filling'
    ],
    optimizations: {
      water: 85, // percentage of recommended
      fertilizer: 78,
      pesticide: 65
    }
  },
  '2': {
    cropId: '2',
    confidence: 87,
    yieldPrediction: 38.7,
    riskFactors: ['Brown planthopper pressure', 'Water shortage'],
    recommendations: [
      'Implement IPM for brown planthopper',
      'Optimize water usage during flowering',
      'Apply potash for grain quality'
    ],
    optimizations: {
      water: 92,
      fertilizer: 88,
      pesticide: 72
    }
  }
};

// Mock regional data
export const mockRegionalData: RegionalData[] = [
  {
    region: 'Punjab',
    totalFarms: 1247,
    totalArea: 45890,
    avgYield: 42.8,
    majorCrops: ['Wheat', 'Rice', 'Cotton'],
    foodSecurity: 'high',
    climateRisk: 0.35
  },
  {
    region: 'Haryana',
    totalFarms: 987,
    totalArea: 38450,
    avgYield: 41.2,
    majorCrops: ['Wheat', 'Rice', 'Sugarcane'],
    foodSecurity: 'high',
    climateRisk: 0.28
  },
  {
    region: 'Uttar Pradesh',
    totalFarms: 2156,
    totalArea: 67234,
    avgYield: 38.9,
    majorCrops: ['Wheat', 'Rice', 'Corn', 'Sugarcane'],
    foodSecurity: 'medium',
    climateRisk: 0.52
  },
  {
    region: 'Rajasthan',
    totalFarms: 1543,
    totalArea: 52678,
    avgYield: 32.4,
    majorCrops: ['Wheat', 'Bajra', 'Mustard'],
    foodSecurity: 'medium',
    climateRisk: 0.68
  }
];

// Mock market data
export const mockMarketData: MarketData[] = [
  {
    crop: 'Wheat',
    currentPrice: 2150,
    priceChange: 5.2,
    demand: 'high',
    supply: 'balanced',
    forecast: [2150, 2180, 2205, 2190, 2220, 2240]
  },
  {
    crop: 'Rice',
    currentPrice: 3450,
    priceChange: -2.1,
    demand: 'medium',
    supply: 'surplus',
    forecast: [3450, 3420, 3380, 3410, 3390, 3370]
  },
  {
    crop: 'Corn',
    currentPrice: 1890,
    priceChange: 8.7,
    demand: 'high',
    supply: 'deficit',
    forecast: [1890, 1920, 1950, 1980, 2010, 2040]
  },
  {
    crop: 'Cotton',
    currentPrice: 5670,
    priceChange: 12.3,
    demand: 'high',
    supply: 'deficit',
    forecast: [5670, 5720, 5780, 5850, 5920, 5980]
  }
];

// Yield trends over months
export const yieldTrendData = [
  { month: 'Jan', yield: 38.2, predicted: 40.1 },
  { month: 'Feb', yield: 39.1, predicted: 41.2 },
  { month: 'Mar', yield: 41.5, predicted: 42.8 },
  { month: 'Apr', yield: 43.2, predicted: 44.1 },
  { month: 'May', yield: 42.8, predicted: 43.9 },
  { month: 'Jun', yield: 40.3, predicted: 41.7 },
  { month: 'Jul', yield: 38.9, predicted: 39.8 },
  { month: 'Aug', yield: 37.6, predicted: 38.2 },
  { month: 'Sep', yield: 39.4, predicted: 40.1 },
  { month: 'Oct', yield: 41.7, predicted: 42.3 },
  { month: 'Nov', yield: 43.1, predicted: 44.2 },
  { month: 'Dec', yield: 44.8, predicted: 45.6 }
];

// Climate impact data
export const climateImpactData = [
  { factor: 'Temperature', impact: 75, trend: 'increasing' },
  { factor: 'Rainfall', impact: 60, trend: 'decreasing' },
  { factor: 'Humidity', impact: 45, trend: 'stable' },
  { factor: 'Soil Health', impact: 70, trend: 'improving' },
  { factor: 'Pest Pressure', impact: 55, trend: 'increasing' }
];

// Resource optimization data
export const resourceOptimization = {
  water: {
    current: 850,
    optimized: 720,
    savings: 15.3,
    unit: 'liters/acre'
  },
  fertilizer: {
    current: 125,
    optimized: 98,
    savings: 21.6,
    unit: 'kg/acre'
  },
  seeds: {
    current: 45,
    optimized: 42,
    savings: 6.7,
    unit: 'kg/acre'
  },
  energy: {
    current: 180,
    optimized: 145,
    savings: 19.4,
    unit: 'kWh/acre'
  }
};