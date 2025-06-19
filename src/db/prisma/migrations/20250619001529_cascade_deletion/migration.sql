-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BookEditingEntity" (
    "bookId" TEXT NOT NULL,
    "editingEntityId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("bookId", "editingEntityId"),
    CONSTRAINT "BookEditingEntity_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BookEditingEntity_editingEntityId_fkey" FOREIGN KEY ("editingEntityId") REFERENCES "EditingEntity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BookEditingEntity" ("bookId", "createdAt", "editingEntityId", "updatedAt") SELECT "bookId", "createdAt", "editingEntityId", "updatedAt" FROM "BookEditingEntity";
DROP TABLE "BookEditingEntity";
ALTER TABLE "new_BookEditingEntity" RENAME TO "BookEditingEntity";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
