-- CreateTable
CREATE TABLE "leads" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "business" TEXT NOT NULL,
    "request" TEXT,
    "budget" TEXT,
    "contacts" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
