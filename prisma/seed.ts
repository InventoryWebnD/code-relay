import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a draft shell only. The uploaded frontend describes Code Relay 5.0,
  // but does not contain official 5.0 problem statements or confirmed dates.
  await prisma.competition.upsert({
    where: { slug: "code-relay-5" },
    update: {},
    create: {
      slug: "code-relay-5",
      name: "Code Relay 5.0",
      edition: "5.0",
      description:
        "A nationwide Web2 and Web3 hackathon organized by the Web and Design Society, IIT Bhubaneswar.",
      format: "Hybrid",
      status: "DRAFT",
      isPublished: false,
      minTeamSize: 2,
      maxTeamSize: 4,
      allowedTracks: ["WEB2", "WEB3"],
      eligibility:
        "Undergraduate and postgraduate students currently enrolled in a recognized university or institute in India.",
    },
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
