import { AssignedStaff } from "./User";

export interface Service {
  id: string,
  name: string,
  duration: number,
  provider: string,
  cost: number,
  is_video: boolean,
  color: string,
  deleted: boolean,
  business_id: string,
  assigned_staff: AssignedStaff[],
};

export interface FormService {
  id: string,
  name: string,
  color: string,
  is_video: boolean,
  cost: number,
  duration: number,
  deleted: boolean,
  assigned_staff: { name: string, id: string, avatar: string | null }[],
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
  assigned_staff: string[],
  business_id: string,
  cost_start?: string,
  duration_start?: string,
};