export type RequiredExecptFor<T, TOptional extends keyof T> = Pick<
    T,
    Exclude<keyof T, TOptional>
> &
    Partial<T>;
