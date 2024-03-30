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
          description:
            "It corresponds to the zodiac sign the Sun appeared to be in front of when you are born. Because the Earth completes one revolution around the Sun each year, the Sun moves through all the Zodiac Sun Signs in the same order every year. For example, everyone born right before the Spring Equinox (currently in early March) is always a Pisces.",
          isActive: true,
        },

        // Add more categories as needed
      ],
    });

    console.log("Seeded Personality Categories:", categories);

    // Seed Personalities
    const personalities = await prisma.personality.createMany({
      data: [
        {
          name: "Leo",
          description: `About Leo
          What is the personality of a Leo?
          Leos are bold, warm, and loving. They are also the ultimate performers. They can dazzle with the theatrical flair of a Broadway star and the charisma of a politician. They are captivating personalities. No matter how quickly they’ve just been introduced to a topic, they can speak eloquently about almost anything because they have such a way with words.
          
          Leos inject ambition into everything they do. They are ruled by the heart. Their actions are natural and effortless because they are brash and confident and trust their instincts.
          
          Leos have an unrelenting appetite for growth that is easily satiated by the praise of others. When they are hurting, it shows. They will use their anger as a protective wall to shield their vulnerabilities. They want to be perceived as unbreakable because they are scared of admitting vulnerability, needing things from other people, or being incomplete.
          
          What are a Leo's weaknesses?
          A Leo's bad sides appear when their admirable character traits cross over into excess. They can be perceived as overbearing, but this is due to their hyper-presence and warmth.
          
          Leos have a reputation for bragging a lot. They see bragging as sharing. Sharing their accomplishments with others makes Leos feel connected, and they expect the same in return from their friends. They want to be celebrated, but they are equally happy to celebrate you.
          
          Leos like to feel important. They don’t necessarily want to be worshipped. They just want to be recognized for their authentic selves. The difference between admiration and worship is subtle, but it’s the difference between a Leo being preoccupied with themselves, or being focused on the good of the people they care about.
          
          Leos want to be the center of the universe. They want to be rewarded for being the best and the brightest. They want to be given special treatment. But they also want to feel deserving of it.
          
          What do Leos hate the most?
          Leos hate being bossed around. They are very much in charge of their own destiny. Leos are perpetually wounded by what they perceive to be acts of betrayal and abandonment. Their pride is a sword that they wield to protect their autonomy.
          
          Because their sense of honor is so intense, Leos hold both themselves and others to a very high standard. They can feel deeply wounded when someone breaks that code. There is an ingrained need for everyone to acknowledge and validate their existence. This can lead to what can be labeled as narcissistic or absolutist behavior that borders on the absurd.
          
          Leos hate being told what to do, but if you can get them to listen, they can usually be persuaded—especially if you make them feel like it was what they wanted all along. But they’ll always secretly resent that they didn’t reach this conclusion alone. Leos don’t like to be told to do things, and they especially don't like being forced.`,
          categoryTitle: "zodiac",
        },
        {
          name: "Cancer",
          description: `About Cancer
          What is the personality of a Cancer?
          A Cancer’s personality is like wading chest deep in a lake of warm water. It feels sparkling and cool while you're in the shallow end, but you know that if you were to dive in, it would feel warm.
          
          The self-awareness of a Cancer is like the tides–constantly moving in and out of focus. Their personalities are layered. Cancers have many moods, some of which are contradictory, but they also have a deep, core self that persists.
          
          Cancers are weighed down by their own sorrows and the sorrows of those around them. They are frequently haunted by grief. It’s hard for them to share their pain with others, and they are often afraid to be vulnerable because they carry a fear that people will use their weaknesses against them. Cancers have learned to hide their pain to avoid burdening anyone else. They pretend they’re okay when they’re not.
          
          Their emotions are like an exposed nerve. Cancers can feel everything. They’re like a tuning fork that vibrates at the slightest provocation. They tend to carry deep grudges because they can’t forget the emotional sting of even a slight.
          
          What are Cancers attracted to?
          Cancers are homebodies. Drawn to stability, routine, and the comfort of the familiar, they don't like change. Cancers like to know what is expected. They tend to be less experimental than others. Traditions and the past captivate their imaginations. They love art that reminds them of a different time, old stories and art forms. Predictable environments make them feel comfortable. They like to know what’s going to happen. They like to feel that they’re part of a bigger plan. They don’t like surprises.`,
          categoryTitle: "zodiac",
        },
        // Add more personalities as needed
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
