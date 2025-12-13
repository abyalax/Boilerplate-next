-- CreateTable
CREATE TABLE "cv" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "linkedin" VARCHAR(100) NOT NULL,
    "about" TEXT NOT NULL,
    "interest" JSONB NOT NULL,
    "skill" JSONB NOT NULL,
    "education" JSONB NOT NULL,
    "experience" JSONB NOT NULL,
    "projects" JSONB NOT NULL,
    "certificate" JSONB NOT NULL,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
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
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "rolesId" INTEGER,

    CONSTRAINT "role_permissions_roleId_permissionId_pk" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "user_roles_userId_roleId_pk" PRIMARY KEY ("userId","roleId")
);

-- CreateIndex
CREATE INDEX "cv_name_idx" ON "cv"("name");

-- CreateIndex
CREATE INDEX "cv_email_idx" ON "cv"("email");

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
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
