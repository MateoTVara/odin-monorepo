/*
  Warnings:

  - You are about to drop the column `characterId` on the `run_characters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "run_characters" DROP CONSTRAINT "run_characters_characterId_fkey";

-- AlterTable
ALTER TABLE "run_characters" DROP COLUMN "characterId";
