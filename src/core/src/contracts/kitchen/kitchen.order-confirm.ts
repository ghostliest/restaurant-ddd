export namespace KitchenOrderConfirmed {
  export const eventName = "kitchen.order-confirmed.event";

  export class Request {
    orderId!: string;
    items!: {
      id: string;
      meal_id: string;
      name: string;
      quantity: number;
    }[];
  }
}
