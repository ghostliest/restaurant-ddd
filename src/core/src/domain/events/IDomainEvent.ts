import { AggregateRoot } from "../AggregateRoot";

export interface IDomainEvent<T> {
  dateTimeOccurred: Date;
  aggregate: AggregateRoot<T>;
}
