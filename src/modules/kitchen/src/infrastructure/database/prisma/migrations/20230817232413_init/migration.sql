-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ACCEPTED', 'COOK', 'COOKED');

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "meal_id" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "quantity" SMALLINT NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_item_id_key" ON "order_item"("id");

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
