export enum GrowthStage {
  Seedling = "Seedling",
  Growing = "Growing",
  Mature = "Mature"
}

export enum HealthStatus {
  Excellent = "Excellent",
  Healthy = "Healthy",
  NeedsCare = "Needs Care"
}

export type ProductCategory = 'Plants' | 'Seeds' | 'Pots' | 'Care' | 'Gifting';

export interface ValueHistoryPoint {
  date: string; // ISO Date or simple "Day X"
  value: number;
}

export interface PlantVariant {
  id: string;
  sku: string;
  image: string;
  currentHeightCm: number;
  currentValue: number;
  health: HealthStatus;
  traits: string[]; // e.g. "Double Stem", "New Leaf"
  matches: number; // Compatibility match %
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: string; // Representative image
  category: ProductCategory; // New field
  stage: GrowthStage;
  health: HealthStatus;
  plantedDate: string; // ISO Date
  
  // Growth Metrics
  currentHeightCm: number;
  maxHeightCm: number;
  growthPercentage: number; // 0 to 100
  
  // Value Metrics
  purchasePrice: number;
  currentValue: number;
  expectedValue30Days: number;
  valueHistory: ValueHistoryPoint[];
  
  // Care Info
  waterFrequency: string;
  sunlightNeeds: string;
  soilType: string;
  humidityLevel: string;

  // Live Inventory
  variants?: PlantVariant[];
}