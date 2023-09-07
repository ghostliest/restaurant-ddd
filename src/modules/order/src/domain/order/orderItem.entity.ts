import { Entity, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { IOrderItem } from ".";

export class OrderItem extends Entity<IOrderItem> {
  get id(): string {
    return this._id.toString();
  }

  get mealId(): string {
    return this.props.mealId.toString();
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get price(): number {
    return this.props.unitPrice.value;
  }

  private constructor(props: IOrderItem, id?: EntityID) {
    super(props, id);
  }

  public static restore(props: IOrderItem, id: EntityID): Result<OrderItem> {
    return Result.ok<OrderItem>(new OrderItem(props, id));
  }

  public static create(props: IOrderItem): Result<OrderItem> {
    return Result.ok<OrderItem>(new OrderItem(props));
  }
}
