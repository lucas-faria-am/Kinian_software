/*
  Warnings:

  - Made the column `nome` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `celular` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataNasc` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estado` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cidade` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bairro` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "senha" SET NOT NULL,
ALTER COLUMN "celular" SET NOT NULL,
ALTER COLUMN "dataNasc" SET NOT NULL,
ALTER COLUMN "estado" SET NOT NULL,
ALTER COLUMN "cidade" SET NOT NULL,
ALTER COLUMN "bairro" SET NOT NULL;
