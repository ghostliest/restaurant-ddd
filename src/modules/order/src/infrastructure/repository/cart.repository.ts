import { Maybe } from "@/core/monads";
import { EntityID } from "@/core/domain";
import { Cart, CartItem, ICartRepository } from "domain/cart";
import { PrismaService } from "infrastructure/database/prisma/prisma";
import { cartMapper } from "infrastructure/mappers/Cart.mapper";
import { IGetCartItemsDTO } from "application/usecases/cart/query/getCartItems";

export class CartRepository implements ICartRepository {
  constructor(private _db: PrismaService) {}

  exists(value: Cart): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async save(cart: Cart): Promise<void> {
    const mapped = cartMapper.toPersistence(cart);

    await this._db.$transaction(async (db) => {
      const cartOrNull = await db.cart.findUnique({
        where: { id: mapped.cart.id },
      });

      // time min 36ms max 60+
      if (!!cartOrNull) {
        await db.cart.delete({
          where: { id: mapped.cart.id },
        });
      }

      await db.cart.create({
        data: {
          ...mapped.cart,
          cartItems: {
            createMany: {
              data: mapped.cartItems,
            },
          },
        },
      });

      // time min 74ms max 115+
      // if (!!cartOrNull) {
      //   await db.cart.update({
      //     where: { id: mapped.cart.id },
      //     data: {
      //       ...mapped.cart,
      //       cartItems: {
      //         deleteMany: {
      //           cartId: mapped.cart.id,
      //           NOT: mapped.cartItems.map(({ id }) => ({ id })),
      //         },
      //         upsert: mapped.cartItems.map((i) => ({
      //           where: { id: i.id },
      //           create: i,
      //           update: i,
      //         })),
      //       },
      //     },
      //   });
      // } else {
      //   await db.cart.create({
      //     data: mapped.cart,
      //   });
      // }
    });
  }

  public async getByCustomerId(id: EntityID): Promise<Maybe<Cart>> {
    const cart = await this._db.cart.findUnique({
      where: {
        customerId: id.toString(),
      },
      select: {
        id: true,
        customerId: true,
        amount: true,
        cartItems: {
          select: {
            id: true,
            mealId: true,
            quantity: true,
            unitPrice: true,
          },
        },
      },
    });

    return Maybe.just(cartMapper.toDomain(cart));
  }

  public async getItemsByCustomerId(dto: IGetCartItemsDTO): Promise<Maybe<any>> {
    const { customerId, page, limit } = dto;
    const items = await this._db.cart.findUnique({
      where: { customerId },
      select: {
        cartItems: {
          skip: page * limit - limit,
          take: limit,
          select: {
            id: true,
            quantity: true,
            unitPrice: true,
            meal: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return Maybe.just(items?.cartItems);
  }
}
