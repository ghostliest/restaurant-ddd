export interface IRepository<T> {
  exists(aggregate: T): Promise<boolean>;
  save(aggregate: T): Promise<void>;
}
