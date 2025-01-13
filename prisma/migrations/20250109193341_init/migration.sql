-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "google_id" TEXT,
    "microsoft_id" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wiki_name" TEXT,
    "has_mandate" BOOLEAN NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "proposer_id" INTEGER NOT NULL,
    "implementer_id" INTEGER NOT NULL,
    "proposition_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agenda_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "table" TEXT,
    "proposed_resolution" TEXT NOT NULL DEFAULT 'Javaslom, hogy a VIK HK fogadja el az előterjesztést.',
    "previous_proposals" TEXT NOT NULL,
    "yes_votes" INTEGER NOT NULL,
    "no_votes" INTEGER NOT NULL,
    "abstention_votes" INTEGER NOT NULL,
    "invalid_votes" INTEGER NOT NULL,
    "is_accepted" BOOLEAN NOT NULL,
    "is_urgent" BOOLEAN NOT NULL,
    "is_electronic" BOOLEAN NOT NULL,
    "is_double_majority" BOOLEAN NOT NULL,
    "is_hidden" BOOLEAN NOT NULL,
    CONSTRAINT "Proposal_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposal_proposer_id_fkey" FOREIGN KEY ("proposer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Proposal_implementer_id_fkey" FOREIGN KEY ("implementer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "proposal_id" INTEGER NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "is_hidden" BOOLEAN NOT NULL,
    CONSTRAINT "Attachment_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "Proposal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_microsoft_id_key" ON "User"("microsoft_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_wiki_name_key" ON "User"("wiki_name");
