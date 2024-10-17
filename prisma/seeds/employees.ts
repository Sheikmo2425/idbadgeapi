import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedEmployees = async () => {
  await prisma.employee.createMany({
    data: [
      { id: '1', fullName: 'Mobileuser', displayName: 'John', department: 'Sales', designation: 'Manager', email: 'Sheikmo2425v@gmail.com', gradeId: '3', employeeType: 'Regular', joinDate: new Date(), company: 'Company A', dateOfBirth: new Date('1985-01-01') },
      { id: '2', fullName: 'MObileuser2', displayName: 'Jane', department: 'HR', designation: 'Executive', email: 'sdfjlsdf@gmail.com', gradeId: '3', employeeType: 'Regular', joinDate: new Date(), company: 'Company B', dateOfBirth: new Date('1990-02-02') },
      { id: '3', fullName: 'EMployees', displayName: 'Jane', department: 'HR', designation: 'Executive', email: 'jane.smiths@example.com', gradeId: '3', employeeType: 'Regular', joinDate: new Date(), company: 'Company B', dateOfBirth: new Date('1990-02-02') },
      // add 3 more employees
    ],
  });
};
