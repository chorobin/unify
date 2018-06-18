# Unify

Unify provides a generic monad/functor higher order functions which work on multiple libraries. ImmutableJS, Maybe type, RxJS and Arrays. They all work using the same higher
order function.

It uses conditional types in TypeScript 2.8 to not lose type information

## Getting Started

npm install unify --save

### Prerequisites

Map works on an array

```typescript
const array: Array<number> = [1, 2, 3];
const fn = (x: number) => x * 2;
const timesTwo = map(fn)(array);
```

Works on a the Maybe type

```typescript
const maybeNumber: Maybe<number> = maybe(1);
const fn = (x: number) => x * 2;
const timesTwo = map(fn)(maybeNumber);
```

### Installing

npm install unify --save

## Running the tests

npm run test

## Authors

* **Christopher Horobin** - *Initial work* - [PurpleBooth](https://github.com/chorobin

See also the list of [contributors](https://github.com/chorobin/unify/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* RxJS
* ImmutableJS
* Monads!
