import { View } from "@/app/home/calendar/calendar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDayRange } from "../functions/dateRanges/getDayRange";

export const useCalendarNavigation = () => {
  
  const today = new Date();
  const initDate = new Date();
  initDate.setDate(1);
  initDate.setDate(initDate.getDay() * -1);

  const [startDate, setStartDate] = useState<Date>(initDate);

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
    selectedDate.setDate(selectedDate.getDay() * -1);

    setStartDate(selectedDate);
  }, [selected, viewing.month]);


  // Increment / decrement month
  const onMonthSwitch = useCallback((n: number) => {
    const newDate = new Date(startDate);

    newDate.setMonth(newDate.getMonth() + n);
    
    setViewing({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })

    newDate.setDate(1);
    const selectedDate = new Date(newDate);
    newDate.setDate(newDate.getDay() * -1);

    setStartDate(newDate);

    if (n === 2) {
      setSelected(getDayRange(selectedDate));
    }
    if (n === 0) {
      selectedDate.setMonth(selectedDate.getMonth() + 1);
      selectedDate.setDate(1);
      selectedDate.setDate(selectedDate.getDate() - 1);
      setSelected(getDayRange(selectedDate));
    }
  }, [startDate]);

  const onReset = useCallback(() => {
    const td = new Date();
    const init = new Date();
    init.setDate(1);
    init.setDate(init.getDay() * -1);
    
    setViewing({
      month: td.getMonth(),
      year: td.getFullYear(),
    });
    setStartDate(init);
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