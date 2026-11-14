/*
  Warnings:

  - You are about to drop the column `isFree` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `videoUrl` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "completedLessons" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "isFree",
ADD COLUMN     "videoUrl" TEXT NOT NULL;
