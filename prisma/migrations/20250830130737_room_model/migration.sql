/*
  Warnings:

  - You are about to drop the column `url` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Room_url_key";

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "public"."Room"("name");
