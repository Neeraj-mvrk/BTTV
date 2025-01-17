-- CreateTable
CREATE TABLE "Preferences" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "minTemperature" DOUBLE PRECISION NOT NULL,
    "maxTemperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION,
    "condition" TEXT NOT NULL,
    "notify" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);
