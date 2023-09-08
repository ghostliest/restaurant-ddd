import { AggregateRoot, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { IOrderProps, TOrderItem, TOrderStatus } from ".";

export class Order extends AggregateRoot<IOrderProps> {
  get meals(): TOrderItem[] {
    return this.props.meals;
  }

  public changeStatus(status: TOrderStatus): Result<void> {
    this.props.status = status;
    return Result.ok<void>();
  }

  private constructor(props: IOrderProps, id?: EntityID) {
    super(props, id);
  }

  public static restore(order: IOrderProps, id: EntityID): Result<Order> {
    return Result.ok<Order>(new Order(order, id));
  }

  public static create(orderItems: TOrderItem[], id: EntityID): Result<Order> {
    return Result.ok<Order>(
      new Order(
        {
          status: "ACCEPTED",
          meals: orderItems,
        },
        id
      )
    );
  }
}
