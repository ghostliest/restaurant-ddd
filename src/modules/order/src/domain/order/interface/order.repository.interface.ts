import { EntityID } from "@/core/domain";
import { Maybe } from "@/core/monads";
import { IRepository } from "@/core/infrastructure";
import { Order } from "../";

export interface IOrderRepository extends IRepository<Order> {
  getByOrderId(id: EntityID): Promise<Maybe<Order>>;
}
