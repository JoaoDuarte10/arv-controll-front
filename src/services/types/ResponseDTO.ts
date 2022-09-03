export type Response<T = any> = {
  data: T;
  status: number;
  error?: any;
};
