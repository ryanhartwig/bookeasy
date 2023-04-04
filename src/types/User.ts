export interface User {
  id: string,
  ownBusinessId: string | null,
  name: string,
  email: string,
  businessIds: [string, boolean][],
  created: number,
  phone?: number,
  avatar?: string,
};