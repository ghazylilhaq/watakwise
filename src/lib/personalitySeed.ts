// seed.ts

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed PersonalityCategories
    const categories = await prisma.personalityCategory.createMany({
      data: [
        {
          title: "zodiac",
          isActive: true,
        },
        {
          title: "mbti",
          isActive: true,
        }
      ],
    });

    console.log("Seeded Personality Categories:", categories);

    // Seed Personalities
    const personalities = await prisma.personality.createMany({
      data: [
        {
          name: "Leo",
          categoryTitle: "zodiac",
        },
        {
          name: "Cancer",
          categoryTitle: "zodiac",
        },
        // Add more zodiac personalities as needed
        {
          name: "Aries",
          categoryTitle: "zodiac",
        },
        {
          name: "Taurus",
          categoryTitle: "zodiac",
        },
        {
          name: "Gemini",
          categoryTitle: "zodiac",
        },
        {
          name: "Virgo",
          categoryTitle: "zodiac",
        },
        {
          name: "Libra",
          categoryTitle: "zodiac",
        },
        {
          name: "Scorpio",
          categoryTitle: "zodiac",
        },
        {
          name: "Sagittarius",
          categoryTitle: "zodiac",
        },
        {
          name: "Capricorn",
          categoryTitle: "zodiac",
        },
        {
          name: "Aquarius",
          categoryTitle: "zodiac",
        },
        {
          name: "Pisces",
          categoryTitle: "zodiac",
        },
        // Add more MBTI personalities as needed
        {
          name: "ISTJ",
          categoryTitle: "mbti",
        },
        {
          name: "ISFJ",
          categoryTitle: "mbti",
        },
        {
          name: "INFJ",
          categoryTitle: "mbti",
        },
        {
          name: "INTJ",
          categoryTitle: "mbti",
        },
        {
          name: "ISTP",
          categoryTitle: "mbti",
        },
        {
          name: "ISFP",
          categoryTitle: "mbti",
        },
        {
          name: "INFP",
          categoryTitle: "mbti",
        },
        {
          name: "INTP",
          categoryTitle: "mbti",
        },
        {
          name: "ESTP",
          categoryTitle: "mbti",
        },
        {
          name: "ESFP",
          categoryTitle: "mbti",
        },
        {
          name: "ENFP",
          categoryTitle: "mbti",
        },
        {
          name: "ENTP",
          categoryTitle: "mbti",
        },
        {
          name: "ESTJ",
          categoryTitle: "mbti",
        },
        {
          name: "ESFJ",
          categoryTitle: "mbti",
        },
        {
          name: "ENFJ",
          categoryTitle: "mbti",
        },
        {
          name: "ENTJ",
          categoryTitle: "mbti",
        },
      ],
    });

    console.log("Seeded Personalities:", personalities);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
