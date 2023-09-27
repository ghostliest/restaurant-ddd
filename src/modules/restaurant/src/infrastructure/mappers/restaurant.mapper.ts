import { Document } from "mongoose";
import { EntityID } from "@/core/domain";
import { Mapper } from "@/core/infrastructure";
import { Restaurant } from "domain/restaurant";
import { restaurantModel, TRestaurantModel } from "infrastructure/database/mongo/schema";

class RestaurantMapper extends Mapper<Restaurant, TRestaurantModel, Document> {
  public toDomain(raw: TRestaurantModel | null): Restaurant {
    if (!raw) return null as any;

    const restaurant = Restaurant.restore(
      {
        address: raw.address,
        phone: raw.phone,
        isDeleted: raw.isDeleted,
        tables: raw.tables,
        createdAt: raw.createdAt,
      },
      new EntityID(raw._id),
    );

    return restaurant.getValue();
  }

  public toPersistence(aggregate: Restaurant): Document {
    const { id, props } = aggregate;

    return new restaurantModel({
      _id: id.toString(),
      address: {
        city: props.address.city,
        street: props.address.street,
        building: props.address.building,
      },
      phone: props.phone,
      isDeleted: props.isDeleted,
      tables: props.tables,
      createdAt: props.createdAt,
    });
  }
}

export const restaurantMapper = new RestaurantMapper();
