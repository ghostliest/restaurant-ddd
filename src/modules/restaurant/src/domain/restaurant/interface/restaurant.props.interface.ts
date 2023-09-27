import { EntityID } from "@/core/domain";
import { Table } from "..";

export interface IRestaurantCreateProps {
  phone: string;
  address: {
    city: string;
    street: string;
    building: number;
  };
}

export interface IRestaurantProps extends IRestaurantCreateProps {
  tables: Table[];
  isDeleted: boolean;
  createdAt: Date;
}

interface IMongoSchema {
  _id: string;
}

export interface IRestaurantMongoSchema extends IRestaurantProps, IMongoSchema {}

export interface ITableCreateProps {
  restaurantId: EntityID;
  capacity: number;
}

export interface ITableProps extends ITableCreateProps {
  isAvailable: boolean;
}
