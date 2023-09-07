import { Entity, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { MealPrice } from "domain/meal";
import { ICartItem } from ".";

export class CartItem extends Entity<ICartItem> {
  get id(): string {
    return this._id.toString();
  }

  get mealId(): string {
    return this.props.mealId.toString();
  }

  get quantity(): number {
    return this.props.quantity;
  }

  set quantity(value: number) {
    this.props.quantity = value;
  }

  get price(): number {
    return this.props.unitPrice.value;
  }

  set price(value: number) {
    this.props.unitPrice = MealPrice.create(value).getValue();
  }

  private constructor(props: ICartItem, id?: EntityID) {
    super(props, id);
  }

  public static restore(props: ICartItem, id: EntityID): Result<CartItem> {
    return Result.ok<CartItem>(new CartItem(props, id));
  }

  public static create(props: ICartItem): Result<CartItem> {
    return Result.ok<CartItem>(new CartItem(props));
  }
}
