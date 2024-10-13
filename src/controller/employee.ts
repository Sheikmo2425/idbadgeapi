import { Request, Response } from 'express';
import { prisma } from '..';

export const getEmployees = async (req: Request, res: Response) => {
  const employees = await prisma.employee.findMany();
  console.log('sd',employees)
  res.json(employees);
};

export const getEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await prisma.employee.findUnique({ where: { id } });
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  const { fullName, displayName, department, designation, country, email, pictureUrl, grade, employeeType, joinDate, company, dateOfBirth, managerId } = req.body;
  const employee = await prisma.employee.create({
    data: {
      fullName,
      displayName,
      department,
      designation,
      country,
      email,
      pictureUrl,
      grade,
      employeeType,
      joinDate: new Date(joinDate),
      company,
      dateOfBirth: new Date(dateOfBirth),
      managerId,
    }
  });
  res.status(201).json(employee);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, displayName, department, designation, country, email, pictureUrl, grade, employeeType, joinDate, lastWorkingDate, company, dateOfBirth, managerId } = req.body;
  const employee = await prisma.employee.update({
    where: { id },
    data: {
      fullName,
      displayName,
      department,
      designation,
      country,
      email,
      pictureUrl,
      grade,
      employeeType,
      joinDate: new Date(joinDate),
      lastWorkingDate: lastWorkingDate ? new Date(lastWorkingDate) : null,
      company,
      dateOfBirth: new Date(dateOfBirth),
      managerId
    }
  });
  res.json(employee);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.employee.delete({ where: { id } });
  res.status(204).send();
};