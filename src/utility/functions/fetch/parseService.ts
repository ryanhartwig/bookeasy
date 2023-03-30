import { Service } from "@/types/Service"

export const parseToService = (data: any): Service => {
  return {
    id: data.id,
    businessId: data.business.id,
    name: data.name,
    duration: data.duration,
    provider: data.provider,
    cost: data.cost,
    isVideo: data.isVideo,
    color: data.color,
    userIds: [],
  }
}