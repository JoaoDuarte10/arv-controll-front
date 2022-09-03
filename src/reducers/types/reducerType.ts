export type ReducerActionType<T = any> = {
    type: string;
    payload: T;
}