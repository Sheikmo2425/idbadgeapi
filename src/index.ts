import express from 'express';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import authRoutes from './routers/authRouter';

import cors from 'cors';
import userRouter from './routers/userRouter';
import employeeRouter from './routers/employeeRouter';
import dictionaryRouter from './routers/dictionaryRouter';

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors()); 
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.get('/', (req, res) => {
  res.redirect('/api-docs');
})
// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/users', userRouter);
app.use('/employees', employeeRouter);
app.use('/dictionary',dictionaryRouter)

const PORT: any = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
