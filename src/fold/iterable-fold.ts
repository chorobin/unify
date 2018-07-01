export const fold = <T, U>(f: (acc: U, val: T) => U, seed: U) => (
  iterable: Iterable<T>,
) => {
  let acc = seed;
  for (const val of iterable) acc = f(acc, val);
  return acc;
};
