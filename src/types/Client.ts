export interface Client {
  id: string,
  business_id: string,
  name: string,
  email: string,
  notes?: string,
  avatar?: any,
  address?: string,
  phone?: string,
  created: number,
  active: boolean,
  assigned_users: string[],
};