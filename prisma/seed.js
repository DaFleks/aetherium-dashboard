// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { faker, fakerEN_CA } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateRandomRole = () => {
  let role = "GUEST";
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      role = "GUEST";
      break;
    case 1:
      role = "MODERATOR";
      break;
    case 2:
      role = "ADMIN";
      break;
  }
  return role;
};

async function main() {
  // Generate 100 dummy users
  Array.from({ length: 100 }).map(
    async () =>
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          hashedPassword: faker.internet.password(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          role: generateRandomRole(),
          address: {
            create: {
              street: fakerEN_CA.location.street(),
              city: fakerEN_CA.location.city(),
              province: fakerEN_CA.location.state(),
              postalCode: fakerEN_CA.location.zipCode(),
              country: "Canada",
              phoneNumber: fakerEN_CA.phone.number(),
            },
          },
          avatarUrl: faker.image.avatar(),
        },
      })
  );

  console.log("✅ Seeded 100 users");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
