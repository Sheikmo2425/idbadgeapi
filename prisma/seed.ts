import { seedEmployees } from "./seeds/employees";
import { seedUsers } from "./seeds/user";


async function main() {
  await seedEmployees();
  await seedUsers();

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  });
