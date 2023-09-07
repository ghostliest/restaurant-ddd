import { EntityID } from "@/core/domain";
import { Mapper } from "@/core/infrastructure";
import { Cart, CartItem } from "domain/cart";
import { MealPrice } from "domain/meal";

type TCartItems = {
  id: string;
  mealId: string;
  quantity: number;
  unitPrice: number;
};

interface ICartPersistence {
  cart: {
    id: string;
    customerId: string;
    amount: number;
  };
  cartItems: TCartItems[];
}

interface ICartToDomainProps {
  id: string;
  customerId: string;
  amount: number;
  cartItems: TCartItems[];
}

class CartMapper extends Mapper<Cart, ICartToDomainProps, ICartPersistence> {
  public toDomain(raw: ICartToDomainProps | null): Cart {
    if (!raw) return null as any;

    const meals = raw.cartItems.map((i) =>
      CartItem.restore(
        {
          mealId: new EntityID(i.mealId),
          unitPrice: MealPrice.create(i.unitPrice).getValue(),
          quantity: i.quantity,
        },
        new EntityID(i.id)
      ).getValue()
    );

    const cart = Cart.restore(
      {
        customerId: new EntityID(raw.customerId),
        amount: raw.amount,
        meals,
      },
      new EntityID(raw.id)
    );
    return cart.getValue();
  }

  public toPersistence(aggregate: Cart): ICartPersistence {
    return {
      cart: {
        id: aggregate.id.toString(),
        customerId: aggregate.customerId,
        amount: aggregate.props.amount || 0,
      },
      cartItems: aggregate.meals.map((i) => ({
        id: i.id,
        mealId: i.mealId.toString(),
        quantity: i.quantity,
        unitPrice: i.price,
      })),
    };
  }
}

export const cartMapper = new CartMapper();
