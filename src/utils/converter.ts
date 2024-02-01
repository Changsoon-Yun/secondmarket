import { categories } from '@/constant/categories.ts';
import { conditions } from '@/constant/conditions.ts';

export const convertLabelByValue = (
  value: string,
  arr: typeof categories | typeof conditions
): string | undefined => {
  const item = arr.find((item) => item.value === value);
  return item ? item.label : undefined;
};

export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
