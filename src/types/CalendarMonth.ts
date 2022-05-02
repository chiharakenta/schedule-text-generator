export type CalendarDate = {
  date: Date;
  active: boolean;
  disabled: boolean;
  isHoliday: boolean;
};

export type CalendarMonth = {
  year: number;
  month: number;
  weeks: [CalendarDate[], CalendarDate[], CalendarDate[], CalendarDate[], CalendarDate[], CalendarDate[]];
};
