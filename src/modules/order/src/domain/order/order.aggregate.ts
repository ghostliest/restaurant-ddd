import { AggregateRoot, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { DomainEventsEnum, domainEvents } from "application/domainEvents";
import { IOrderCreateProps, IOrderProps, OrderConfirmedEvent, OrderItem } from ".";

export class Order extends AggregateRoot<IOrderProps> {
  get customerId(): string {
    return this.props.customerId.toString();
  }

  get meals(): OrderItem[] {
    return this.props.meals;
  }

  public addMeal(meal: OrderItem): Result<void> {
    if (this.props.status === "OPEN") {
      this.props.meals.push(meal);
      return Result.ok<void>();
    } else {
      return Result.fail<void>("Order is closed");
    }
  }

  public confirm(): Result<void> {
    this.props.isPaid = true;
    domainEvents.emit(DomainEventsEnum.OrderConfirmed, new OrderConfirmedEvent(this));
    return Result.ok<void>();
  }

  public close(status: "COMPLETED" | "CANCELLED"): Result<void> {
    this.props.status = status;
    return Result.ok<void>();
  }

  public cancel(): Result<void> {
    if (this.props.isPaid) {
      return Result.fail<void>("Order cannot be cancelled");
    }

    return Result.ok<void>();
  }

  public setShippingInside(restaurantId: EntityID, employeeId: EntityID) {
    this.props.type = "INSIDE";
    this.props.restaurantId = restaurantId;
    this.props.employeeId = employeeId;
  }

  private constructor(props: IOrderProps, id?: EntityID) {
    super(props, id);
  }

  public static restore(props: IOrderProps, id: EntityID): Result<Order> {
    return Result.ok<Order>(new Order(props, id));
  }

  public static create(props: IOrderCreateProps): Result<Order> {
    if (props.meals.length === 0) {
      return Result.fail<Order>("Empty order");
    }

    return Result.ok<Order>(
      new Order({
        ...props,
        isPaid: false,
        status: "OPEN",
      })
    );
  }
}
