-- CreateIndex
CREATE INDEX "Notification_user_id_read_idx" ON "Notification"("user_id", "read");

-- CreateIndex
CREATE INDEX "StockTable_marketCap_idx" ON "StockTable"("marketCap" DESC);

-- CreateIndex
CREATE INDEX "StockTable_changePercent_idx" ON "StockTable"("changePercent" DESC);

-- CreateIndex
CREATE INDEX "StockTable_lastUpdated_idx" ON "StockTable"("lastUpdated" DESC);

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt" DESC);
