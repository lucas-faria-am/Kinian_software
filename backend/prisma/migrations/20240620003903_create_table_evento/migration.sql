-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);
