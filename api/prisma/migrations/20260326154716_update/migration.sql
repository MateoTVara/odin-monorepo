/*
  Warnings:

  - You are about to drop the column `img_url` on the `characters` table. All the data in the column will be lost.
  - The primary key for the `level_characters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `character_id` on the `level_characters` table. All the data in the column will be lost.
  - You are about to drop the column `level_id` on the `level_characters` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `levels` table. All the data in the column will be lost.
  - The primary key for the `run_characters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `character_id` on the `run_characters` table. All the data in the column will be lost.
  - You are about to drop the column `found` on the `run_characters` table. All the data in the column will be lost.
  - You are about to drop the column `run_id` on the `run_characters` table. All the data in the column will be lost.
  - You are about to drop the column `finish_time` on the `runs` table. All the data in the column will be lost.
  - You are about to drop the column `level_id` on the `runs` table. All the data in the column will be lost.
  - You are about to drop the column `session_id` on the `runs` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `runs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[levelId,characterId]` on the table `level_characters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imgUrl` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `level_characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `level_characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `levels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelCharacterId` to the `run_characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runId` to the `run_characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `runs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `runs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "level_characters" DROP CONSTRAINT "level_characters_character_id_fkey";

-- DropForeignKey
ALTER TABLE "level_characters" DROP CONSTRAINT "level_characters_level_id_fkey";

-- DropForeignKey
ALTER TABLE "run_characters" DROP CONSTRAINT "run_characters_character_id_fkey";

-- DropForeignKey
ALTER TABLE "run_characters" DROP CONSTRAINT "run_characters_run_id_fkey";

-- DropForeignKey
ALTER TABLE "runs" DROP CONSTRAINT "runs_level_id_fkey";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "img_url",
ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "level_characters" DROP CONSTRAINT "level_characters_pkey",
DROP COLUMN "character_id",
DROP COLUMN "level_id",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD CONSTRAINT "level_characters_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "levels" DROP COLUMN "img_url",
ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "run_characters" DROP CONSTRAINT "run_characters_pkey",
DROP COLUMN "character_id",
DROP COLUMN "found",
DROP COLUMN "run_id",
ADD COLUMN     "characterId" INTEGER,
ADD COLUMN     "foundAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "levelCharacterId" INTEGER NOT NULL,
ADD COLUMN     "runId" INTEGER NOT NULL,
ADD CONSTRAINT "run_characters_pkey" PRIMARY KEY ("runId", "levelCharacterId");

-- AlterTable
ALTER TABLE "runs" DROP COLUMN "finish_time",
DROP COLUMN "level_id",
DROP COLUMN "session_id",
DROP COLUMN "start_time",
ADD COLUMN     "finishTime" TIMESTAMP(3),
ADD COLUMN     "levelId" INTEGER NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "level_characters_levelId_characterId_key" ON "level_characters"("levelId", "characterId");

-- CreateIndex
CREATE INDEX "runs_sessionId_idx" ON "runs"("sessionId");

-- AddForeignKey
ALTER TABLE "level_characters" ADD CONSTRAINT "level_characters_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_characters" ADD CONSTRAINT "level_characters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runs" ADD CONSTRAINT "runs_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_characters" ADD CONSTRAINT "run_characters_runId_fkey" FOREIGN KEY ("runId") REFERENCES "runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_characters" ADD CONSTRAINT "run_characters_levelCharacterId_fkey" FOREIGN KEY ("levelCharacterId") REFERENCES "level_characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "run_characters" ADD CONSTRAINT "run_characters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
