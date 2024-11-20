/*
  Warnings:

  - Added the required column `activo` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` ADD COLUMN `activo` BOOLEAN NOT NULL;
