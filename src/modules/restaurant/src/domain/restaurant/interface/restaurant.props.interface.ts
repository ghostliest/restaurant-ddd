export interface IRestaurantCreateProps {
  phone: string;
  address: {
    city: string;
    street: string;
    building: number;
  };
}

export interface IRestaurantProps extends IRestaurantCreateProps {}
