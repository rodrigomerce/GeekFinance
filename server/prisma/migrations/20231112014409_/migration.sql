-- CreateTable
CREATE TABLE "cadastro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cad_user" TEXT NOT NULL,
    "cad_pass" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "t_descricao" TEXT NOT NULL,
    "cad_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "aportes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "a_nome" TEXT NOT NULL,
    "a_valor" TEXT NOT NULL,
    "a_tipo" TEXT NOT NULL,
    "a_observacao" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
