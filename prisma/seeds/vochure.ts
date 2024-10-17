import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedVochures = async () => {
  await prisma.vochure.createMany({
    data: [
      { id: '1', name: 'Discount Voucher', description: '10% off', BrandId: '1', typeId: 'SingleUse', expiresAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60000) },
      { id: '2', name: 'Promo Code', description: '20% off', BrandId: '2', typeId: 'MultiUse', expiresAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60000) },
      // add 3 more vochures
    ],
  });
};
