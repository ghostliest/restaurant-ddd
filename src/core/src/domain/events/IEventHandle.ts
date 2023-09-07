import { IDomainEvent } from "./IDomainEvent";

export interface IEventHandle<T> {
  handle(event: IDomainEvent<T>): Promise<void>;
}
