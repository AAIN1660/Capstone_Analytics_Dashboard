-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderDate" DATETIME NOT NULL,
    "category" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "revenue" REAL NOT NULL,
    "orderId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sale_orderId_key" ON "Sale"("orderId");

-- CreateIndex
CREATE INDEX "Sale_orderDate_idx" ON "Sale"("orderDate");

-- CreateIndex
CREATE INDEX "Sale_category_idx" ON "Sale"("category");

-- CreateIndex
CREATE INDEX "Sale_region_idx" ON "Sale"("region");
