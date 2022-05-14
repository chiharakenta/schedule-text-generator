export const replaceItemAtIndex = <T>(arr: Array<T>, index: number, newValue: T): Array<T> => [
  ...arr.slice(0, index),
  newValue,
  ...arr.slice(index + 1)
];
