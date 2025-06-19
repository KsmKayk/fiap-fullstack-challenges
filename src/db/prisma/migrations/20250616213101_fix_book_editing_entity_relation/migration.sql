/*
  Warnings:

  - You are about to drop the `_BookEditingEntities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookEditingEntities";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BookEditingEntity" (
    "bookId" TEXT NOT NULL,
    "editingEntityId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("bookId", "editingEntityId"),
    CONSTRAINT "BookEditingEntity_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookEditingEntity_editingEntityId_fkey" FOREIGN KEY ("editingEntityId") REFERENCES "EditingEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
