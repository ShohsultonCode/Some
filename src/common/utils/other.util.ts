import { v4 } from 'uuid';

export const getUniqueId = () => v4();
export const getOrgName = (userId: number) => `Organization-${userId}`;

export const getCurrentDate = () => new Date();
export const getNextMonthDate = (date: Date) => {
  const currentMonth = date.getMonth();
  if (currentMonth >= 11)
    return new Date(date.getFullYear() + 1, 0, date.getDate());
  date.setMonth(currentMonth + 1);
  return date;
};

export const getHalfMonthBefore = (date: Date) => {
  date.setDate(date.getDate() - 15);
  return date;
};

export const getHalfMonthAfter = (date: Date) => {
  date.setDate(date.getDate() + 15);
  return date;
};
