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
  monday: string,
  tuesday: string,
  wednesday: string,
  thursday: string,
  friday: string,
  saturday: string,
  sunday: string,
  recurring: Recurring[],
  time_off: TimeOff[],
}