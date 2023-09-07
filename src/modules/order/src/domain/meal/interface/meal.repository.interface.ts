import { EntityID } from "@/core/domain";
import { Maybe } from "@/core/monads";
import { IRepository } from "@/core/infrastructure";
import { Meal } from "..";

export interface IMealRepository extends IRepository<Meal> {
  getById(id: EntityID): Promise<Maybe<Meal>>;
}
