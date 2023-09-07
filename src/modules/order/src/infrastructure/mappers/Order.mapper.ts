import { EntityID } from "@/core/domain";
import { Mapper } from "@/core/infrastructure";
import { MealPrice } from "domain/meal";
import { Order, IOrderItem, TOrderStatus, TOrderType, OrderItem } from "domain/order";

type WithEntityId<T, I = EntityID> = T & { id: I };

interface IOrderToDomainProps {
  id: string;
  customerId: string;
  amount: number;
  orderItems: WithEntityId<IOrderItem<string>, string>[];
  isPaid: boolean;
  status: TOrderStatus;
  type?: TOrderType | null;
  restaurantId?: string | null;
  employeeId?: string | null;
}

interface IOrderToPersistence {
  order: {
    id: string;
    customerId: string;
    amount: number;
    isPaid: boolean;
    status: TOrderStatus;
    type?: TOrderType | null;
    restaurantId?: string | null;
  };
  orderItems: WithEntityId<IOrderItem<string>, string>[];
  shipping: {
    inside: {
      employeeId?: string | null;
    };
  };
}

class OrderMapper extends Mapper<Order, IOrderToDomainProps, IOrderToPersistence> {
  public toDomain(raw: IOrderToDomainProps | null): Order {
    if (!raw) return null as any;

    const order = Order.restore(
      {
        customerId: new EntityID(raw.customerId),
        restaurantId: raw.restaurantId ? new EntityID(raw.restaurantId) : undefined,
        employeeId: raw.employeeId ? new EntityID(raw.employeeId) : undefined,
        amount: raw.amount,
        isPaid: raw.isPaid,
        status: raw.status,
        meals: raw.orderItems.map((i) =>
          OrderItem.restore(
            {
              mealId: new EntityID(i.mealId),
              quantity: i.quantity,
              unitPrice: MealPrice.create(i.unitPrice).getValue(),
            },
            new EntityID(i.id)
          ).getValue()
        ),
      },
      new EntityID(raw.id)
    );
    return order.getValue();
  }

  public toPersistence(aggregate: Order): IOrderToPersistence {
    return {
      order: {
        id: aggregate.id.toString(),
        customerId: aggregate.props.customerId.toString(),
        amount: aggregate.props.amount,
        isPaid: aggregate.props.isPaid,
        status: aggregate.props.status,
        type: aggregate.props.type ?? null,
        restaurantId: aggregate.props.restaurantId?.toString() ?? null,
      },
      orderItems: aggregate.meals.map((i) => ({
        id: i.id,
        mealId: i.mealId.toString(),
        unitPrice: i.price,
        quantity: i.quantity,
      })),
      shipping: {
        inside: {
          employeeId: aggregate.props.employeeId?.toString() ?? null,
        },
      },
    };
  }
}

export const orderMapper = new OrderMapper();
