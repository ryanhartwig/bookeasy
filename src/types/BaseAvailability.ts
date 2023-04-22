export interface AvailabilitySlice {
  business_id: string,
  /**
   * Indexed day of week, 0 (monday) - 6 (sunday)
   */
  day: number,
  start_time: string,
  end_time: string,
}

interface Recurring {
  start_period: number,
  end_period: number,
  recurring_interval: number,
  availability: {
    [key: string]: string,
  }
}

interface TimeOff {
  start_period: number,
  end_period: number,
  reason: string,
}

export interface BaseAvailability {
  id: string,
  userId: string,
  businessId: string,
  /**
   * Availability time chunks throughout the week, indexed by day (0 - 6 = monday - sunday)
   */
  slices: AvailabilitySlice[],
  recurring: Recurring[],
  timeOff: TimeOff[],
}