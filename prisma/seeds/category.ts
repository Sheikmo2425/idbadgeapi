import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedCategories = async () => {
  await prisma.category.createMany({
    data: [
      { id: '1', name: 'Brand' },
    
      { id: '2', name: 'Grade' },
      { id: '3', name: 'Company'},
   
 
    ],
  });
};
