import EventEmitter from "node:events";
import { IDomainEvent } from "./IDomainEvent";

export class DomainEvents {
  private _ee = new EventEmitter();

  public on(eventName: string, listener: (event: IDomainEvent<any>) => void): void {
    this._ee.on(eventName, listener);
  }

  public emit(eventName: string, event: IDomainEvent<any>): void {
    this._ee.emit(eventName, event);
  }
}
