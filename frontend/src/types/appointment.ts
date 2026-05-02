export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Appointment {
  id: number;
  agent_id: number;
  lead_id: number;
  lead_name: string;      // Added for the table view
  property_title: string; // Added for the table view
  scheduled_at: string;   // ISO string from DB
  status: AppointmentStatus;
  notes?: string;
}
