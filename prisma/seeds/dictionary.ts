import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedDictionaries = async () => {
  await prisma.dictionary.createMany({
    data: [
      { id: '1', name: 'Sales', description: 'Sales department',catId:'1' },
      { id: '2', name: 'HR', description: 'HR department', CountryCode: 'CA', catId:'1' },
      { id: '3', name: 'Grade', description: 'HR department', grade:'10%',catId:'2' },
      { id: '4', name: 'Brand', description: 'Rolex', CountryCode: 'SG', catId:'1' },
      { id: '6', name: 'HR', description: 'HR department', CountryCode: 'CA', catId:'1'},
      { id: '5', name: 'HR', description: 'HR department', CountryCode: 'CA', catId:'3' },
      // add 3 more dictionaries
    ],
  });
};
