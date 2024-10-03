import {  PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function seedUsers() {
const saltRounds = 10
  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'sheikmo2425v@gmail.com',
      password: await bcrypt.hash('123Pa$$word!', saltRounds),
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@company.com',
      password: 'userpassword', 
      role: 'USER',
    },
  });
}

