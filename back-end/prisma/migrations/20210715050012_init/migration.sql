-- CreateTable
CREATE TABLE "Service" (
    "serviceId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "Promo" (
    "promoId" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    PRIMARY KEY ("promoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service.name_unique" ON "Service"("name");

-- AddForeignKey
ALTER TABLE "Promo" ADD FOREIGN KEY ("serviceId") REFERENCES "Service"("serviceId") ON DELETE CASCADE ON UPDATE CASCADE;
