
-- CreateTable
CREATE TABLE "cv" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "linkedin" VARCHAR(150) NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

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
    "major" VARCHAR(150) NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER,
    "description" TEXT NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "techstack" VARCHAR(255) NOT NULL,
    "link" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "issuer" VARCHAR(255) NOT NULL,
    "issued_year" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "roles_id" INTEGER,

    CONSTRAINT "RolePermissions_role_id_permission_id_pk" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY ("user_id","role_id")
);

-- CreateIndex
CREATE INDEX "cv_name_idx" ON "cv"("name");

-- CreateIndex
CREATE INDEX "cv_email_idx" ON "cv"("email");

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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_key_unique" ON "permissions"("key");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_unique" ON "roles"("name");

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
