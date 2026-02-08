/*
  Warnings:

  - Added the required column `summary` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "summary" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;
