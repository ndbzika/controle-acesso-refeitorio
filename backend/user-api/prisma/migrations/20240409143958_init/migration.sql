/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `matricula` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foto` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `curso` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `turma` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "matricula" SET NOT NULL,
ALTER COLUMN "foto" SET NOT NULL,
ALTER COLUMN "curso" SET NOT NULL,
ALTER COLUMN "turma" SET NOT NULL;
