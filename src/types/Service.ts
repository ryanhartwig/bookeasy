export interface AssignedUser {
  id: string,
  name: string,
  avatar?: string,
}

export interface Service {
  id: string,
  name: string,
  duration: number,
  provider: string,
  cost: number,
  is_video: boolean,
  color: string,
  deleted: boolean,
  assigned_users: AssignedUser[],
};

export interface FormService {
  id: string,
  name: string,
  color: string,
  is_video: boolean,
  cost: number,
  duration: number,
  deleted: boolean,
}

export interface ServiceInput {
  id: string,
  name: string,
  duration: number,
  provider: string,
  cost: number,
  is_video: boolean,
  color: string,
  deleted: boolean,
  assigned_users: string[],
  business_id: string,
};