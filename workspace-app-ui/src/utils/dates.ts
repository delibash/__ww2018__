import { Nullable } from '../types/utilityTypes';
import { Employment } from '../types/domainTypes';

export const getDiffInDays = (end: number, start: number) => {
  const day = 1000 * 60 * 60 * 24;
  const diff = end - start;
  return Math.round(diff / day);
};

export const getStartEndDate = (endDate: number, startDate: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const endYear = new Date(endDate).getFullYear();
  const endMonth = new Date(endDate).getMonth();

  const startYear = new Date(startDate).getFullYear();
  const startMonth = new Date(startDate).getMonth();

  const endMonthYear = months[endMonth] + ', ' + endYear;
  const startMonthYear = months[startMonth] + ', ' + startYear;

  const dateNow = new Date(Date.now());
  const end = dateNow.getFullYear() <= endYear ? 'present' : endMonthYear;

  return startMonthYear + ' - ' + end;
};

export const currentPosition = (arr: Array<any>) => {
  return arr.reduce((x, y) => y.duration.endDate > x.duration.endDate ? y : x, arr[1]);
};

export const years = (days: number) => Math.round(.002738 * days);

export const getCurrentPosition = (workExperience: Array<Employment>): Nullable<Employment> => {
  const filteredExperience = workExperience.filter(exp => exp.current);

  return filteredExperience[0] || null;
};