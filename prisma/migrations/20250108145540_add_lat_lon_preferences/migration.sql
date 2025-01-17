/*
  Warnings:

  - Added the required column `lat` to the `Preferences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `Preferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preferences" ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lon" TEXT NOT NULL;
