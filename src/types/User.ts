export interface User {
  id: string,
  name: string,
  email: string,
  ownBusinessId?: string | null,
  businessIds?: [string, boolean][],
  created?: number,
  phone?: number,
  avatar?: string,
};