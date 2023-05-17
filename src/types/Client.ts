export interface Client {
  id: string,
  name: string,
  email?: string,
  notes?: string,
  avatar?: any,
  address?: string,
  phone?: string,
  joined_date: string,
  active: boolean,
  registered_user_id: string,
};

export interface FormClient {
  id: string,
  name: string,
  avatar: string,
}

export interface ClientInput extends Client {
  business_id?: string,
}

export interface EditClientInput {
  id: string,
  name: string | null,
  email: string | null,
  notes: string | null,
  address: string | null,
  phone: string | null,
  active: boolean,
}