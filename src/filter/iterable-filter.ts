export const filter = <T>(f: (val: T) => boolean) => (iterable: Iterable<T>) =>
  iterableFilter(f, iterable);

function* iterableFilter<T>(
  f: (val: T) => boolean,
  iterable: Iterable<T>,
): Iterable<T> {
  for (const val of iterable) {
    if (f(val)) {
      yield val;
    }
  }
}
