import { IRestaurantMongoSchema } from "domain/restaurant";
import { InferSchemaType, Schema, model } from "mongoose";

export const restaurantSchema = new Schema<IRestaurantMongoSchema>({
  _id: String,
  phone: String,
  isDeleted: Boolean,
  address: {
    city: String,
    street: String,
    building: Number,
  },
  tables: [
    {
      _id: String,
      capacity: Number,
      isAvailable: Boolean,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const restaurantModel = model("restaurant", restaurantSchema);

export type TRestaurantModel = InferSchemaType<typeof restaurantSchema>;
