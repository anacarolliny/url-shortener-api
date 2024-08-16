/*
  Warnings:

  - The primary key for the `short_urls` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "short_urls" DROP CONSTRAINT "short_urls_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "short_urls_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "short_urls_id_seq";
