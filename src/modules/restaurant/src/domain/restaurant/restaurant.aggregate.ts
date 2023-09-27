import { AggregateRoot, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { IRestaurantCreateProps, IRestaurantProps, Table } from ".";

export class Restaurant extends AggregateRoot<IRestaurantProps> {
  get tables(): Table[] {
    return this.props.tables;
  }

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
        tables: [],
        isDeleted: false,
        createdAt: new Date(),
      }),
    );
  }
}
