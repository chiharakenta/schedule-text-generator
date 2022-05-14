export const removeItemAtIndex = <T>(arr: Array<T>, index: number): Array<T> => [
  ...arr.slice(0, index),
  ...arr.slice(index + 1)
];
