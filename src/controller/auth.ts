import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { generateOTP, sendOTPEmail } from '../utils/auth';
import { prisma } from '..';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role
      }
    });
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    res.status(400).json({ error: 'Username or email already exists' });
  }
};

export const login = async (req: Request|any, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password )
  const user = await prisma.user.findUnique({ where: { username } });
console.log(user)
// bcrypt.compare()
  if (user &&  password== user.password) {
    req.session.userId = user.id;
    res.json({ message: 'Logged in successfully' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const requestOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  const employee = await prisma.employee.findUnique({ where: { email } });

  if (employee) {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await prisma.oTP.create({
      data: {
        email,
        otp,
        expiresAt
      }
    });

    try {
    const r=  await sendOTPEmail(email, otp);
      console.log(r)
      res.json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Failed to send OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

export const verifyOTP = async (req: Request|any, res: Response) => {
  const { email, otp } = req.body;

  const validOTP = await prisma.oTP.findFirst({
    where: {
      email,
      otp,
      expiresAt: { gt: new Date() }
    }
  });

  if (validOTP) {
    const employee = await prisma.employee.findUnique({ where: { email } });
    if (employee) {
      req.session.employeeId = employee.id;
      await prisma.oTP.delete({ where: { id: validOTP.id } });
      await prisma.employee.update({
        where: { id: employee.id },
        data: { lastLogin: new Date() }
      });
      res.json({ message: 'Logged in successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } else {
    res.status(401).json({ error: 'Invalid or expired OTP' });
  }
};

export const logout = (req: Request|any, res: Response) => {
  req.session.destroy((err:any) => {
    if (err) {
      res.status(500).json({ error: 'Could not log out' });
    } else {
      res.json({ message: 'Logged out successfully' });
    }
  });
};