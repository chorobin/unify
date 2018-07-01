export type Just<T> = {
  readonly get: NonNullable<T>;
  readonly isNothing: boolean;
};
