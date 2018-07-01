export const zipWith = <TFirst, TSecond, TZipped>(
  zipper: (first: TFirst, second: TSecond) => TZipped,
) => (first: Iterable<TFirst>, second: Iterable<TSecond>) =>
  iterbleZipWith(zipper, first, second);

function* iterbleZipWith<TFirst, TSecond, TZipped>(
  zipper: (first: TFirst, second: TSecond) => TZipped,
  first: Iterable<TFirst>,
  second: Iterable<TSecond>,
): Iterable<TZipped> {
  const firstIterator = first[Symbol.iterator]();
  const secondIterator = second[Symbol.iterator]();
  let firstResult: IteratorResult<TFirst>;
  let secondResult: IteratorResult<TSecond>;
  while (
    !(firstResult = firstIterator.next()).done &&
    !(secondResult = secondIterator.next()).done
  ) {
    yield zipper(firstResult.value, secondResult.value);
  }
}
