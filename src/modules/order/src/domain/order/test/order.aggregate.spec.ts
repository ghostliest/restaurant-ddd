import { EntityID } from "@/core/domain";
import { MealPrice } from "domain/meal";
import { Order, OrderItem } from "..";

const createOrderItem = (item: { id?: string; quantity?: number; price?: number }) => {
  const { id, quantity = 1, price = 100 } = item;
  return OrderItem.create({
    mealId: new EntityID(id),
    unitPrice: MealPrice.create(price).getValue(),
    quantity,
  }).getValue();
};

const createOrder = () => {
  return Order.create({
    customerId: new EntityID(),
    amount: 200,
    meals: [createOrderItem({})],
  });
};

describe("Order aggregate", () => {
  describe("order create", () => {
    it("create success", () => {
      const meals = [
        {
          mealId: new EntityID().toString(),
          price: 100,
          quantity: 1,
        },
        {
          mealId: new EntityID().toString(),
          price: 150,
          quantity: 2,
        },
      ];

      const orderItems: OrderItem[] = [];
      let amount = 0;

      for (const { mealId, quantity, price } of meals) {
        const orderItem = createOrderItem({ id: mealId, quantity, price });
        orderItems.push(orderItem);
        amount += price * quantity;
      }

      const orderOrFail = Order.create({
        customerId: new EntityID(),
        meals: orderItems,
        amount,
      });

      expect(orderOrFail.isSuccess).toBeTruthy();
    });

    it("create without meals - should be fail", () => {
      const orderOrFail = Order.create({
        customerId: new EntityID(),
        amount: 0,
        meals: [],
      });
      expect(orderOrFail.isFailure).toBeTruthy();
    });
  });

  describe("add meals", () => {
    it("when order status OPEN", () => {
      const orderItem = createOrderItem({});
      const orderOrFail = Order.create({
        customerId: new EntityID(),
        amount: 200,
        meals: [createOrderItem({ price: 200 })],
      });
      const order = orderOrFail.getValue();
      order.addMeal(orderItem);
      expect(order.meals.length === 2).toBeTruthy();
    });
    it("when order status COMPLETED", () => {
      const order = createOrder().getValue();
      order.close("COMPLETED");
      const addMealResult = order.addMeal(createOrderItem({}));
      expect(addMealResult.isFailure).toBeTruthy();
    });
  });
});
