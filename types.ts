export type ViewState = 'home' | 'guide' | 'itinerary' | 'budget' | 'chat' | 'map';

export interface LocationInfo {
  name: string;
  description: string;
  activities: string[];
  climate: string;
  image: string;
}

export interface BudgetItem {
  category: string;
  costLow: number;
  costHigh: number;
  perPerson: boolean; // if false, per group (like car rental)
  frequency: 'daily' | 'once';
}

export interface TravelStyle {
  id: 'budget' | 'mid' | 'luxury';
  label: string;
  description: string;
  costs: BudgetItem[];
}

export interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  image?: string;
}

export interface Itinerary {
  duration: number; // days
  title: string;
  description: string;
  days: DayPlan[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type POICategory = 'city' | 'town' | 'nature' | 'farm' | 'park';

export interface PointOfInterest {
  id: string;
  name: string;
  category: POICategory;
  lat: number;
  lng: number;
  description: string;
  contact?: string;
  image?: string;
}

export interface TravelTime {
  from: string;
  to: string;
  time: string;
}