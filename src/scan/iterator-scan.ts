export const scan = <T, U>(f: (acc: U, val: T) => U, seed: U) => (
  iterable: Iterable<T>,
) => iterableScan(f, seed, iterable);

function* iterableScan<T, U>(
  f: (acc: U, val: T) => U,
  seed: U,
  iterable: Iterable<T>,
): Iterable<U> {
  let acc = seed;
  for (const val of iterable) {
    acc = f(acc, val);
    yield acc;
  }
}
