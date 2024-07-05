/*
  Warnings:

  - A unique constraint covering the columns `[id,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_id_email_key" ON "User"("id", "email");

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_alunoId_alunoEmail_fkey" FOREIGN KEY ("alunoId", "alunoEmail") REFERENCES "User"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
