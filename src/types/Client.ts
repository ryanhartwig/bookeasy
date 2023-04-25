export interface Client {
  id: string,
  name: string,
  email: string,
  notes?: string,
  avatar?: any,
  address?: string,
  phone?: string,
  joined_date: number,
  active: boolean,
};

export interface FormClient {
  id: string,
  name: string,
  avatar: string,
}