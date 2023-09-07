import { Maybe } from "@/core/monads";
import { EntityID } from "@/core/domain";
import { IRepository } from "@/core/infrastructure";
import { Cart } from "..";

interface IGetItemsByCustomerIdDTO {
  customerId: string;
  page: number;
  limit: number;
}

export interface ICartRepository extends IRepository<Cart> {
  getByCustomerId(id: EntityID): Promise<Maybe<Cart>>;
  getItemsByCustomerId(dto: IGetItemsByCustomerIdDTO): Promise<Maybe<any>>;
}
