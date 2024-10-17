import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedUserRoles = async () => {
  await prisma.userRole.createMany({
    data: [
      { id: '1', name: 'Admin' },
      { id: '2', name: 'User' },
      // add 3 more roles
    ],
  });
};
