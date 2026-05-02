// src/types/property.ts
export interface Property {
  id: number;
  agent_id: number;
  title: string;
  price: number;
  location: string;
  status: 'available' | 'sold' | 'rented';
  description?: string;
  created_at: string;
}
