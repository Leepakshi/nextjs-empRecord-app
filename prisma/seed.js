import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: "Alice", email: "alice@example.com", role: "Developer" },
    { name: "Bob", email: "bob@example.com", role: "Designer" },
    { name: "Charlie", email: "charlie@example.com", role: "Manager" },
    { name: "Diana", email: "diana@example.com", role: "Tester" },
    { name: "Ethan", email: "ethan@example.com", role: "DevOps" },
    { name: "Fiona", email: "fiona@example.com", role: "Support" },
    { name: "George", email: "george@example.com", role: "Engineer" },
    { name: "Hannah", email: "hannah@example.com", role: "Recruiter" },
    { name: "Ian", email: "ian@example.com", role: "Intern" },
    { name: "Jane", email: "jane@example.com", role: "Lead" },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log("✅ 10 users created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
