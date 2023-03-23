const pluralize = (str: string, data: number) => {
  return `${str}${data !== 1 ? 's' : ''}`;
}

export const formatTimePeriod = (ms: number) => {
  const seconds = Number((ms / 1000).toFixed(0));
  const minutes = Number((ms / 1000 / 60).toFixed(0));
  const hours = Number((ms / 1000 / 60 / 60).toFixed(0));
  const days = Number((ms / 1000 / 60 / 60 / 24).toFixed(0));
  const months = Number((ms / 1000 / 60 / 60 / 24 / 30).toFixed(0));

  return seconds < 60 ? `${seconds} ${pluralize('second', seconds)}`
    : minutes < 60 ? `${minutes} ${pluralize('minute', minutes)}`
    : hours < 24 ? `${hours} ${pluralize('hour', hours)}`
    : days < 30 ? `${days} ${pluralize('day', days)}`
    : `${months} ${pluralize('month', months)}`
}