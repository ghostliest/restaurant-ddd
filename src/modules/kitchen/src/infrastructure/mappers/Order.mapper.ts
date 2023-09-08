import { EntityID } from "@/core/domain";
import { Mapper } from "@/core/infrastructure";
import { Order, TOrderItem, TOrderStatus } from "domain/order";

interface IOrderToDomainProps {
  id: string;
  order_items: TOrderItem<string>[];
  status: TOrderStatus;
}

interface IOrderToPersistence {
  order: {
    id: string;
    status: TOrderStatus;
  };
  order_items: TOrderItem<string>[];
}

class OrderMapper extends Mapper<Order, IOrderToDomainProps, IOrderToPersistence> {
  public toDomain(raw: IOrderToDomainProps): Order {
    if (!raw) return null as any;
    const order = Order.restore(
      {
        status: raw.status,
        meals: raw.order_items.map((i) => ({
          ...i,
          id: new EntityID(i.id),
          meal_id: new EntityID(i.meal_id),
        })),
      },
      new EntityID(raw.id)
    );
    return order.getValue();
  }

  public toPersistence(raw: Order): IOrderToPersistence {
    return {
      order: {
        id: raw.id.toString(),
        status: raw.props.status,
      },
      order_items: raw.meals.map((i) => ({
        id: i.id.toString(),
        meal_id: i.meal_id.toString(),
        name: i.name,
        quantity: i.quantity,
      })),
    };
  }
}

export const orderMapper = new OrderMapper();
