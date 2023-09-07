import { EntityID } from "@/core/domain";
import { MealPrice } from "domain/meal";
import { Cart, CartItem } from "..";

const createCartItem = (item: { id?: string; quantity?: number; price?: number }) => {
  const { id, quantity = 1, price = 100 } = item;
  return CartItem.create({
    mealId: new EntityID(id),
    unitPrice: MealPrice.create(price).getValue(),
    quantity,
  }).getValue();
};

const createEmptyCart = () => Cart.create(new EntityID());

describe("Cart aggregate", () => {
  describe("create cart", () => {
    it("create empty cart", () => {
      const cartOrFail = createEmptyCart();
      expect(cartOrFail.isSuccess).toBeTruthy();
    });
  });
  describe("add meal", () => {
    it("add one meal", () => {
      const cart = createEmptyCart().getValue();
      const cartItem = createCartItem({ quantity: 1 });
      cart.addItem(cartItem);
      expect(cart.meals.length === 1).toBeTruthy();
    });

    it("add two meals", () => {
      const cart = createEmptyCart().getValue();
      const cartItem = createCartItem({ quantity: 2 });
      const cartItemTwo = createCartItem({ quantity: 1 });
      cart.addItem(cartItem);
      cart.addItem(cartItemTwo);
      expect(
        cart.meals.length === 2 &&
          cart.meals[0].quantity === 2 &&
          cart.meals[1].quantity === 1
      ).toBeTruthy();
    });
    it("add meal twice", () => {
      const cart = createEmptyCart().getValue();
      const id = new EntityID().toString();
      const quantity = 1;
      const cartItem = createCartItem({ id, quantity });
      const cartItemTwo = createCartItem({ id, quantity });
      cart.addItem(cartItem);
      cart.addItem(cartItemTwo);
      expect(cart.meals.length === 1 && cart.meals[0].quantity === 2).toBeTruthy();
    });
    it("add with negative quantity", () => {
      const cart = createEmptyCart().getValue();
      const cartItem = createCartItem({ quantity: -1 });
      cart.addItem(cartItem);
      expect(cart.meals.length === 0).toBeTruthy();
    });
  });

  describe("delete cart", () => {
    it("delete cart", () => {
      const cart = createEmptyCart().getValue();
      const cartItem = createCartItem({});
      cart.addItem(cartItem);
      cart.clear();
      expect(cart.meals.length === 0).toBeTruthy();
    });
  });
});
