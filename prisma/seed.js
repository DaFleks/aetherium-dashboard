// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("password123", 10);
  await prisma.user.create({
    data: {
      email: "alex@example.com",
      hashedPassword: hashedPassword,
      firstName: "Alex",
      lastName: "Petropoulos",
      role: "ADMIN",
      emailVerified: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
