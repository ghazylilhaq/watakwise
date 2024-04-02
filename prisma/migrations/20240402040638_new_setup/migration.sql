/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Personality` table. All the data in the column will be lost.
  - You are about to drop the `PersonalitySelection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPersonality` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryTitle` to the `Personality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Personality" DROP CONSTRAINT "Personality_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalitySelection" DROP CONSTRAINT "PersonalitySelection_UserPersonalityId_fkey";

-- DropForeignKey
ALTER TABLE "PersonalitySelection" DROP CONSTRAINT "PersonalitySelection_personalityId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserPersonality" DROP CONSTRAINT "UserPersonality_userId_fkey";

-- AlterTable
ALTER TABLE "Personality" DROP COLUMN "categoryId",
ADD COLUMN     "categoryTitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "PersonalitySelection";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "UserPersonality";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonalityToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "_PersonalityToUser_AB_unique" ON "_PersonalityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonalityToUser_B_index" ON "_PersonalityToUser"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_categoryTitle_fkey" FOREIGN KEY ("categoryTitle") REFERENCES "PersonalityCategory"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonalityToUser" ADD CONSTRAINT "_PersonalityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Personality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonalityToUser" ADD CONSTRAINT "_PersonalityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
