interface Details {
  phone?: number,
  email?: string,
  address?: string,
  notes?: string,
}
export interface Client {
  id: string,
  name: string,
  email: string,
  teams: string,
  details?: Details,
};