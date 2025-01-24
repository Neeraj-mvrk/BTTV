-- CreateTable
CREATE TABLE "ForecastCache" (
    "id" SERIAL NOT NULL,
    "preferenceId" INTEGER NOT NULL,
    "forecastData" JSONB NOT NULL,
    "bestDaysData" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForecastCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ForecastCache_preferenceId_key" ON "ForecastCache"("preferenceId");

-- AddForeignKey
ALTER TABLE "ForecastCache" ADD CONSTRAINT "ForecastCache_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preferences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
