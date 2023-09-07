import { randomUUID } from "node:crypto";

export class EntityID {
  private _value: string;

  constructor(id?: string) {
    this._value = id ? id : randomUUID();
  }

  public toString() {
    return this._value;
  }

  public equals(id?: EntityID): boolean {
    if (id === null || id === undefined) return false;
    if (!(id instanceof this.constructor)) return false;
    return id.toString() === this._value;
  }
}
