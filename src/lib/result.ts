/**
 * This is a very simple "container style" Result type for tracking operations
 * that might fail. This type is useful in some specific stuations, such as
 * data validation. I usually don't use this pattern in TS projects because in
 * most cases there are more natural solutions such as the utilities provided
 * by a validation library, react hooks, etc. For a small example project this
 * is good enough.
 */

type Result<T = {}> = Success<T> | Failure;

type Success<T> = T & { ok: true };

type Failure = {
  ok: false;
  message: string;
};

export type { Result, Success, Failure };
