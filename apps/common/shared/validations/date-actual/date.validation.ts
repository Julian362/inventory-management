export const CurrentDateTimeValidation = (value: Date, now: Date): boolean => {
  return Math.abs(value.getTime() - now.getTime()) < 2000;
};
