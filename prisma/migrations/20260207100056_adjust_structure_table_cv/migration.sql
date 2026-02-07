/*
  Warnings:

  - You are about to drop the column `certificate` on the `cv` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `cv` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `cv` table. All the data in the column will be lost.
  - You are about to drop the column `interest` on the `cv` table. All the data in the column will be lost.
  - You are about to drop the column `projects` on the `cv` table. All the data in the column will be lost.
  - You are about to drop the column `skill` on the `cv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cv" DROP COLUMN "certificate",
DROP COLUMN "education",
DROP COLUMN "experience",
DROP COLUMN "interest",
DROP COLUMN "projects",
DROP COLUMN "skill",
ALTER COLUMN "linkedin" SET DATA TYPE VARCHAR(150);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv_skills" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "level" INTEGER,
    "years" DOUBLE PRECISION,

    CONSTRAINT "cv_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "institution" VARCHAR(255) NOT NULL,
    "degree" VARCHAR(150) NOT NULL,
    "field" VARCHAR(150) NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "description" TEXT NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "techStack" VARCHAR(255) NOT NULL,
    "link" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "issuer" VARCHAR(255) NOT NULL,
    "issuedYear" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interests" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE INDEX "cv_skills_skill_id_idx" ON "cv_skills"("skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "cv_skills_cv_id_skill_id_key" ON "cv_skills"("cv_id", "skill_id");

-- CreateIndex
CREATE INDEX "educations_institution_idx" ON "educations"("institution");

-- CreateIndex
CREATE INDEX "educations_degree_idx" ON "educations"("degree");

-- CreateIndex
CREATE INDEX "experiences_company_idx" ON "experiences"("company");

-- CreateIndex
CREATE INDEX "experiences_role_idx" ON "experiences"("role");

-- CreateIndex
CREATE INDEX "projects_name_idx" ON "projects"("name");

-- CreateIndex
CREATE INDEX "certificates_name_idx" ON "certificates"("name");

-- CreateIndex
CREATE INDEX "certificates_issuer_idx" ON "certificates"("issuer");

-- AddForeignKey
ALTER TABLE "cv_skills" ADD CONSTRAINT "cv_skills_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv_skills" ADD CONSTRAINT "cv_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interests" ADD CONSTRAINT "interests_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
