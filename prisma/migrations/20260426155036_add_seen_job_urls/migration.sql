-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "careersUrls" TEXT NOT NULL DEFAULT '[]',
    "ats" TEXT NOT NULL DEFAULT 'other',
    "watchFrequency" TEXT NOT NULL DEFAULT 'none',
    "lastCheckedAt" DATETIME,
    "seenJobUrls" TEXT NOT NULL DEFAULT '[]',
    "rating" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL DEFAULT '',
    "isDisqualified" BOOLEAN NOT NULL DEFAULT false,
    "disqualifiedReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("ats", "careersUrls", "createdAt", "disqualifiedReason", "id", "isDisqualified", "lastCheckedAt", "name", "notes", "rating", "updatedAt", "userId", "watchFrequency", "website") SELECT "ats", "careersUrls", "createdAt", "disqualifiedReason", "id", "isDisqualified", "lastCheckedAt", "name", "notes", "rating", "updatedAt", "userId", "watchFrequency", "website" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE INDEX "Company_userId_idx" ON "Company"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
