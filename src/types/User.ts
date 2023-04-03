export interface User {
  id: string,
  ownBusinessId: string | null,
  name: string,
  email: string,
  phone?: number,
  businessIds: [string, boolean][],
  avatar?: string,
  created: number,
};