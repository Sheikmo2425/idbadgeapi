import {  PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
export async function seedEmployees() {
  const manager = await prisma.employee.create({
    data: {
      fullName: 'John Doe',
      displayName: 'John',
      department: 'Engineering',
      designation: 'Engineering Manager',
      country: 'USA',
      email: 'sheikmo2425v@gmail.com',
      grade: 'M4',
      employeeType: 'Full-time',
      joinDate: new Date('2018-01-15'),
      company: 'Tech Corp',
      dateOfBirth: new Date('1985-06-15'),
    },
  });

  await prisma.employee.create({
    data: {
      fullName: 'Jane Smith',
      displayName: 'Jane',
      department: 'Engineering',
      designation: 'Software Engineer',
      country: 'USA',
      email: 'jane.smith@company.com',
      grade: 'E3',
      employeeType: 'Full-time',
      joinDate: new Date('2020-03-01'),
      company: 'Tech Corp',
      dateOfBirth: new Date('1990-11-20'),
      managerId: manager.id,
    },
  });
}

