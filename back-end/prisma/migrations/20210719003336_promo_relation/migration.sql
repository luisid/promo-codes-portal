/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `Promo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Promo_serviceId_unique" ON "Promo"("serviceId");
