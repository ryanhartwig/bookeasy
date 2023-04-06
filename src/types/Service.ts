export interface Service {
  id: string,
  businessId: string,
  name: string,
  duration: number,
  provider: string,
  cost: number,
  isVideo: boolean,
  color: string,
  userIds: string[],
};