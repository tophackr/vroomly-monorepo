/*
  Warnings:

  - Changed the type of `type` on the `interaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('mileage', 'parking', 'toll_road', 'taxi', 'sober_driver', 'alarm_system', 'fuel', 'wash', 'maintenance', 'tire_service', 'repair', 'part', 'purchase_wheels', 'tow_truck', 'insurance', 'tax', 'state_inspection', 'fine', 'car_purchase', 'loan_repayment', 'leasing', 'car_purchases', 'tuning', 'driver_salary');

-- AlterTable
ALTER TABLE "interaction" DROP COLUMN "type",
ADD COLUMN     "type" "InteractionType" NOT NULL;

-- DropEnum
DROP TYPE "InteractionCategory";
