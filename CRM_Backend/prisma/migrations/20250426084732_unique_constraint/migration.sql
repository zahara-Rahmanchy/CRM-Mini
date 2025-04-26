/*
  Warnings:

  - A unique constraint covering the columns `[userId,email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_userId_email_key" ON "clients"("userId", "email");
