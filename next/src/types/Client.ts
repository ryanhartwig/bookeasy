interface Details {
  phone?: number,
  email?: string,
  address?: string,
  notes?: string,
}
export interface Client {
  id: string,
  business_id: string,
  name: string,
  email: string,
  details?: Details,
};