-- CreateTable
CREATE TABLE "conta" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "saldo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesas" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "contaId" INTEGER NOT NULL,

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receitas" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "contaId" INTEGER NOT NULL,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
