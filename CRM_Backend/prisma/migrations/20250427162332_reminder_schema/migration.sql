-- CreateTable
CREATE TABLE "Reminders" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reminders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reminders_id_key" ON "Reminders"("id");

-- AddForeignKey
ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("client_id") ON DELETE SET NULL ON UPDATE CASCADE;
