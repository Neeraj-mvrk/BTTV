/*
  Warnings:

  - Added the required column `userId` to the `Preferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preferences" ADD COLUMN     "userId" INTEGER NOT NULL;
