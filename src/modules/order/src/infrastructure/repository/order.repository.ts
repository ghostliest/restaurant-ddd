import { EntityID } from "@/core/domain";
import { Maybe } from "@/core/monads";
import { IOrderRepository, Order } from "domain/order";
import { PrismaService } from "infrastructure/database/prisma/prisma";
import { orderMapper } from "infrastructure/mappers/Order.mapper";

export class OrderRepository implements IOrderRepository {
  constructor(private _db: PrismaService) {}

  exists(value: Order): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async save(order: Order): Promise<void> {
    const mapped = orderMapper.toPersistence(order);
    console.log("order save mapped: ", mapped);

    await this._db.$transaction(async (db) => {
      const orderId = mapped.order.id;

      const orderOrNull = await db.order.findUnique({
        where: { id: orderId },
      });

      if (!!orderOrNull) {
        await db.order.delete({
          where: { id: mapped.order.id },
        });
      }

      await db.order.create({
        data: {
          ...mapped.order,
          orderItems: {
            createMany: {
              data: mapped.orderItems,
            },
          },
        },
      });

      const { employeeId } = mapped?.shipping?.inside;

      if (employeeId) {
        await db.orderEmployee.create({
          data: {
            orderId,
            employeeId,
          },
        });
      }
    });
  }

  public async getByOrderId(id: EntityID): Promise<Maybe<Order>> {
    const order = await this._db.order.findUnique({
      where: { id: id.toString() },
      select: {
        id: true,
        restaurantId: true,
        customerId: true,
        isPaid: true,
        status: true,
        type: true,
        amount: true,
        orderItems: {
          select: {
            id: true,
            orderId: true,
            mealId: true,
            quantity: true,
            unitPrice: true,
          },
        },
      },
    });

    return Maybe.just(orderMapper.toDomain(order));
  }
}
