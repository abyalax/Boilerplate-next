/*
  Warnings:

  - You are about to drop the column `issuedYear` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `endYear` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `educations` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `isCurrent` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `projects` table. All the data in the column will be lost.
  - Added the required column `issued_year` to the `certificates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_year` to the `educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techstack` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "issuedYear",
ADD COLUMN     "issued_year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "educations" DROP COLUMN "endYear",
DROP COLUMN "startYear",
ADD COLUMN     "end_year" INTEGER,
ADD COLUMN     "start_year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "endDate",
DROP COLUMN "isCurrent",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "is_current" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "techStack",
ADD COLUMN     "techstack" VARCHAR(255) NOT NULL;
