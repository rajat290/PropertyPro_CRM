export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Property {
    id: number;
    title: string;
    price: number;
    location: string;
    status: 'available' | 'sold' | 'rented';
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: LeadStatus;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
}

export interface Activity {
  id: number;
  type: 'viewing' | 'email' | 'call' | 'meeting';
  title: string;
  date: string;
  leadName: string;
}
