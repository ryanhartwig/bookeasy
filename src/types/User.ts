export interface User {
  id: string,
  own_business_id: string | null,
  name: string,
  email: string,
  phone?: number,
};