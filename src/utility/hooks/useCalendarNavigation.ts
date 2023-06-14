import { View } from "@/app/home/calendar/calendar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDayRange } from "../functions/dateRanges/getDayRange";

export const useCalendarNavigation = () => {
  
  const today = new Date();
  const initDate = new Date();
  initDate.setDate(1);
  
  // First actual date of the month
  const [firstDate, setFirstDate] = useState<Date>(new Date(initDate));

  initDate.setDate(initDate.getDay() * -1); // Set to whatever date falls on sunday (aka top left cell)

  // Top left most date (often being the previous month's end, greyed out)
  const [startDate, setStartDate] = useState<Date>(new Date(initDate));

  // Day current selected
  const [selected, setSelected] = useState<[number, number]>(getDayRange());

  // Month currently selected / viewing
  const [viewing, setViewing] = useState<View>({
    month: today.getMonth(),
    year: today.getFullYear(),
  });
  
  // On selecting day
  const onSelect = useCallback(([min, max]: [number, number]) => {
    setSelected([min, max]);
  }, []);

  useEffect(() => {
    const selectedDate = new Date(selected[0]);
    if (viewing.month === selectedDate.getMonth()) return;

    setViewing({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });
    selectedDate.setDate(1);
    setFirstDate(new Date(selectedDate));
    selectedDate.setDate(selectedDate.getDay() * -1);

    setStartDate(new Date(selectedDate));
  }, [selected, viewing.month]);

  // Increment / decrement month
  const onMonthSwitch = useCallback((n: number) => {
    const newDate = new Date(firstDate);
    newDate.setMonth(newDate.getMonth() + n);

    setViewing({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })
    
    newDate.setDate(1);
    const selectedDate = new Date(newDate); // set selected to first day of month when navigating forward
    setFirstDate(new Date(newDate));

    newDate.setDate(newDate.getDay() * -1);
    setStartDate(new Date(newDate));

    if (n === 1) {
      setSelected(getDayRange(selectedDate));
    }
    if (n === -1) {
      selectedDate.setMonth(selectedDate.getMonth() + 1);
      selectedDate.setDate(1);
      selectedDate.setDate(selectedDate.getDate() - 1); // set selected to last day of month when navigating backward
      setSelected(getDayRange(selectedDate));
    }
  }, [firstDate]);

  const onReset = useCallback(() => {
    const td = new Date();
    const init = new Date();
    init.setDate(1);
    setFirstDate(new Date(init));

    init.setDate(init.getDay() * -1);
    setStartDate(new Date(init));
    
    setViewing({
      month: td.getMonth(),
      year: td.getFullYear(),
    });
    onSelect && onSelect(getDayRange());
  }, [onSelect]);

  return {
    onMonthSwitch,
    onReset,
    startDate, 
    selected, 
    viewing, 
    onSelect
  }
}