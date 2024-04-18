-- CreateTable
CREATE TABLE "papeis" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel_acesso" INTEGER NOT NULL,

    CONSTRAINT "papeis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "papel_id" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "papeis_nome_key" ON "papeis"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_papel_id_fkey" FOREIGN KEY ("papel_id") REFERENCES "papeis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
