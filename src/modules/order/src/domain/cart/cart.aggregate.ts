import { AggregateRoot, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { CartItem, ICartProps } from ".";

export class Cart extends AggregateRoot<ICartProps> {
  get customerId(): string {
    return this.props.customerId.toString();
  }

  get meals(): CartItem[] {
    return this.props.meals;
  }

  private calcAmount() {
    this.props.amount = this.meals.reduce(
      (sum, cur) => sum + cur.quantity * cur.price,
      0
    );
  }

  public addItem(meal: CartItem): Result<void> {
    const { meals } = this;
    const { mealId, price, quantity } = meal;

    const foundMealIdx = meals.findIndex(
      (i) => i.mealId.toString() === mealId.toString()
    );

    if (foundMealIdx >= 0) {
      if (quantity <= 0) {
        this.props.meals.splice(foundMealIdx, 1);
      } else {
        meals[foundMealIdx].quantity += quantity;
        meals[foundMealIdx].price = price;
      }
    } else {
      if (quantity > 0) {
        meals.push(meal);
      }
    }

    this.calcAmount();
    return Result.ok<void>();
  }

  public clear(): Result<void> {
    this.props.meals = [];
    this.props.amount = 0;
    return Result.ok<void>();
  }

  public summary(): Result<ICartProps> {
    return Result.ok<ICartProps>(this.props);
  }

  private constructor(props: ICartProps, id?: EntityID) {
    super(props, id);
  }

  public static restore(props: ICartProps, id: EntityID): Result<Cart> {
    return Result.ok<Cart>(new Cart(props, id));
  }

  public static create(customerId: EntityID): Result<Cart> {
    return Result.ok<Cart>(
      new Cart({
        customerId,
        meals: [],
        amount: 0,
      })
    );
  }
}
