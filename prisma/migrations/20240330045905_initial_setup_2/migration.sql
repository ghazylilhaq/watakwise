/*
  Warnings:

  - The primary key for the `Content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `desciption` on the `Content` table. All the data in the column will be lost.
  - The primary key for the `ContentCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `desciption` on the `ContentCategory` table. All the data in the column will be lost.
  - The primary key for the `Personality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `desciption` on the `Personality` table. All the data in the column will be lost.
  - The primary key for the `PersonalityCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `desciption` on the `PersonalityCategory` table. All the data in the column will be lost.
  - The primary key for the `PersonalitySelection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserPersonality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `description` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ContentCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Personality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_contentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_userId_fkey";

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
ALTER TABLE "Content" DROP CONSTRAINT "Content_pkey",
DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "contentCategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Content_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Content_id_seq";

-- AlterTable
ALTER TABLE "ContentCategory" DROP CONSTRAINT "ContentCategory_pkey",
DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ContentCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ContentCategory_id_seq";

-- AlterTable
ALTER TABLE "Personality" DROP CONSTRAINT "Personality_pkey",
DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Personality_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Personality_id_seq";

-- AlterTable
ALTER TABLE "PersonalityCategory" DROP CONSTRAINT "PersonalityCategory_pkey",
DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PersonalityCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PersonalityCategory_id_seq";

-- AlterTable
ALTER TABLE "PersonalitySelection" DROP CONSTRAINT "PersonalitySelection_pkey",
ALTER COLUMN "personalityId" SET DATA TYPE TEXT,
ALTER COLUMN "UserPersonalityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PersonalitySelection_pkey" PRIMARY KEY ("personalityId", "UserPersonalityId");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UserPersonality" DROP CONSTRAINT "UserPersonality_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "personalityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserPersonality_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserPersonality_id_seq";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PersonalityCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPersonality" ADD CONSTRAINT "UserPersonality_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalitySelection" ADD CONSTRAINT "PersonalitySelection_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "Personality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalitySelection" ADD CONSTRAINT "PersonalitySelection_UserPersonalityId_fkey" FOREIGN KEY ("UserPersonalityId") REFERENCES "UserPersonality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_contentCategoryId_fkey" FOREIGN KEY ("contentCategoryId") REFERENCES "ContentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
