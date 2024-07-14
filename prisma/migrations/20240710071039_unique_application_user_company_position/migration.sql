/*
  Warnings:

  - A unique constraint covering the columns `[userId,companyId,position]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_companyId_position_key" ON "Application"("userId", "companyId", "position");
