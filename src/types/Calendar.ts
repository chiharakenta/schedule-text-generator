export type CalendarTime = {
  time: number;
  active: boolean;
};

export type CalendarDate = {
  date: Date;
  active: boolean;
  disabled: boolean;
  isHoliday: boolean;
};

export type CalendarWeek = CalendarDate[][];

export type CalendarMonth = {
  year: number;
  month: number;
  weeks: CalendarWeek;
};
