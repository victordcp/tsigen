export interface IConfigRepository {
  getConfig<T>(path: string): T;
}