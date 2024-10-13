import { Request, Response } from 'express';
import { prisma } from '..';

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: { id: true, username: true, email: true, role: true } });
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ 
    where: { id },
    select: { id: true, username: true, email: true, role: true }
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  const user = await prisma.user.update({
    where: { id },
    data: { username, email, role },
    select: { id: true, username: true, email: true, role: true }
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id } });
  res.status(204).send();
};