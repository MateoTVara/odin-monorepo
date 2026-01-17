/*
  Warnings:

  - You are about to drop the column `folderId` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `folders` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('FOLDER', 'FILE');

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_folderId_fkey";

-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_ownerId_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "folderId",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "files_id_seq";

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "ownerId",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "folders_id_seq";

-- CreateTable
CREATE TABLE "entries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_id_fkey" FOREIGN KEY ("id") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_id_fkey" FOREIGN KEY ("id") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
