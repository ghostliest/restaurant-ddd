// https://enterprisecraftsmanship.com/posts/functional-c-non-nullable-reference-types/

export class Maybe<T> {
  private readonly _value: T;

  public get value(): T {
    return this._value;
  }

  public get hasValue(): boolean {
    return this._value != null;
  }

  public get hasNoValue(): boolean {
    return !this.hasValue;
  }

  private constructor(value: T) {
    this._value = value;
  }

  public static just<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }
}
