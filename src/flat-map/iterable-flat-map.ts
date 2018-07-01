export const flatMap = <T, U>(f: (val: T) => Iterable<U>) => (
  iterable: Iterable<T>,
) => iterableFlatMap(f, iterable);

function* iterableFlatMap<T, U>(
  f: (val: T) => Iterable<U>,
  outerIterable: Iterable<T>,
): Iterable<U> {
  for (const outerVal of outerIterable) {
    const innerIterable = f(outerVal);
    for (const innerVal of innerIterable) {
      yield innerVal;
    }
  }
}
