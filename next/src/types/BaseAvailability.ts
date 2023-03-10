interface AvailabilitySlice {
  user_id: string,
  business_id: string,
  /**
   * Indexed day of week, 0 (monday) - 6 (sunday)
   */
  day: number,
  start: string,
  end: string,
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
  user_id: string,
  business_id: string,
  /**
   * Availability time chunks throughout the week, indexed by day (0 - 6 = monday - sunday)
   */
  slices: AvailabilitySlice[],
  recurring: Recurring[],
  time_off: TimeOff[],
}