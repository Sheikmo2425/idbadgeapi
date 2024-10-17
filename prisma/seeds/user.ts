import {  PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const seedUsers = async () => {
  const saltRounds = 10
  await prisma.user.createMany({
    data: [
      { id: '1', username: 'adminuser', email: 'sheikmo2425v@gmail.com', password: await bcrypt.hash('123Pa$$word!', saltRounds), role: 'Admin' },
      {  id: '210', username: 'normaluser', email: 'normaluser1@example.com', password: await bcrypt.hash('123Pa$$word!', saltRounds), role: 'User' },
      {  id: '130', username: 'normaluser2', email: 'normaluser2@example.com', password: await bcrypt.hash('123Pa$$word!', saltRounds), role: 'User' },

      // add 3 more users
    ],
  });
};
