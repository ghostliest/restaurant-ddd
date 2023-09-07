import { AggregateRoot } from "@/core/domain";
import { IDomainEvent } from "@/core/domain/events";
import { IOrderProps, Order } from ".";

export class OrderConfirmedEvent implements IDomainEvent<IOrderProps> {
  public dateTimeOccurred: Date;
  public aggregate: AggregateRoot<IOrderProps>;

  constructor(order: Order) {
    this.dateTimeOccurred = new Date();
    this.aggregate = order;
  }
}
