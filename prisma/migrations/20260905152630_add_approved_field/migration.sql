-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Problem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scale" TEXT,
    "source" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Problem" ("category", "createdAt", "description", "id", "scale", "source", "title") SELECT "category", "createdAt", "description", "id", "scale", "source", "title" FROM "Problem";
DROP TABLE "Problem";
ALTER TABLE "new_Problem" RENAME TO "Problem";
CREATE INDEX "Problem_category_idx" ON "Problem"("category");
CREATE INDEX "Problem_approved_idx" ON "Problem"("approved");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
