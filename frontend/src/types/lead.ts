export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  property_id?: number;
}
