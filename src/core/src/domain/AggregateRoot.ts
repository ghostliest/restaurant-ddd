import { Entity } from "./Entity";
import { EntityID } from "./EntityID";

export abstract class AggregateRoot<T> extends Entity<T> {
  get id(): EntityID {
    return this._id;
  }
}
