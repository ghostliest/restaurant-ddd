import { AggregateRoot, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { IRestaurantCreateProps, IRestaurantProps } from ".";

export class Restaurant extends AggregateRoot<IRestaurantProps> {
  private constructor(props: IRestaurantProps, id?: EntityID) {
    super(props, id);
  }

  public static restore(props: IRestaurantProps, id: EntityID): Result<Restaurant> {
    return Result.ok<Restaurant>(new Restaurant(props, id));
  }

  public static create(props: IRestaurantCreateProps): Result<Restaurant> {
    return Result.ok<Restaurant>(
      new Restaurant({
        ...props,
      }),
    );
  }
}
