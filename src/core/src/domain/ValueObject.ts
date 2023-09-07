interface ValueObjectProps {
  [index: string]: any;
}

type validObjectValue = Record<string, any> | null | undefined;

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  private shallowEqual(
    objA: validObjectValue,
    objB: validObjectValue
  ): boolean {
    if (!objA || !objB) return false;
    if (objA === objB) return true;

    const aKeys = Object.keys(objA);
    const bKeys = Object.keys(objB);
    const len = aKeys.length;

    if (bKeys.length !== len) return false;

    for (let i = 0; i < len; i++) {
      const key = aKeys[i];
      const hasOwn = !Object.prototype.hasOwnProperty.call(objB, key);

      if (objA[key] !== objB[key] || hasOwn) {
        return false;
      }
    }

    return true;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return this.shallowEqual(this.props, vo.props);
  }
}
