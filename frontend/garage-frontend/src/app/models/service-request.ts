export interface ServiceRequest {
  id?: number;
  description: string;
  status: string;
  estimatedCost: number;
  actualCost: number;
}