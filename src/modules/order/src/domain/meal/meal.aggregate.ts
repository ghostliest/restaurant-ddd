import { AggregateRoot, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { IMealCreateProps, IMealProps, MealDescription, MealName, MealPrice } from ".";

export class Meal extends AggregateRoot<IMealProps> {
  get id(): EntityID {
    return this._id;
  }

  get name(): MealName {
    return this.props.name;
  }

  get description(): MealDescription {
    return this.props.description;
  }

  get price(): MealPrice {
    return this.props.price;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted!;
  }

  public changePrice(price: MealPrice): Result<void> {
    this.props.price = price;
    return Result.ok<void>();
  }

  private constructor(props: IMealProps, id?: EntityID) {
    super(props, id);
  }

  private static isValid(props: IMealCreateProps): boolean {
    const { name, description, price } = props;
    return !!(name.value && description.value && price.value);
  }

  public static restore(props: IMealProps, id: EntityID): Result<Meal> {
    return Result.ok<Meal>(new Meal(props, id));
  }

  public static create(props: IMealCreateProps): Result<Meal> {
    return this.isValid(props)
      ? Result.ok<Meal>(new Meal({ ...props, isDeleted: false }))
      : Result.fail<Meal>("Meal is invalid");
  }
}
