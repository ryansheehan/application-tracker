/*
  Warnings:

  - The values [DECLINED] on the enum `ApplicationEventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationEventType_new" AS ENUM ('APPLIED', 'INTERVIEW', 'REJECTED', 'OFFER', 'COUNTER_OFFER', 'RECEEDED_OFFER', 'ACCEPTED', 'ABANDONED', 'OTHER');
ALTER TABLE "ApplicationEvent" ALTER COLUMN "type" TYPE "ApplicationEventType_new" USING ("type"::text::"ApplicationEventType_new");
ALTER TYPE "ApplicationEventType" RENAME TO "ApplicationEventType_old";
ALTER TYPE "ApplicationEventType_new" RENAME TO "ApplicationEventType";
DROP TYPE "ApplicationEventType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "notes" TEXT DEFAULT '';
