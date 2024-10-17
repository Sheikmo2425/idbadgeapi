import { PrismaClient } from '@prisma/client';
import { seedUserRoles } from './seeds/userRole';
import { seedUsers } from './seeds/user';
import seedCountries from './seeds/countries.seed';
import { seedEmployees } from './seeds/employees';
import { seedVochures } from './seeds/vochure';
import { seedDictionaries } from './seeds/dictionary';
import { seedCategories } from './seeds/category';

const prisma = new PrismaClient();

const main = async () => {
  await seedCountries(prisma);
  await seedCategories()
  await seedDictionaries();
  await seedUserRoles();
  await seedUsers();  
  await seedEmployees();
  await seedVochures();

};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
