export type Success<T> = {
  some: T;
  error?: undefined;
}

export type Failure<V extends Error> = {
  some?: undefined;
  error: V;
}

export type Result<T, V extends Error> = Success<T> | Failure<V>;
