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

export interface FormService {
  id: string,
  name: string,
  color: string,
  is_video: boolean,
  cost: number,
  duration: number,
}