import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../controller/employee';
import { getAlldictionary } from '../controller/dictionary';

const dictionaryRouter = express.Router();

dictionaryRouter.use(isAuthenticated);

/**
 * @swagger
 * /dictionary:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: query
 *         name: Category
 *         schema:
 *           type: integer
 *           nullable: true
 *         description: Category ID for filtering employees
 *       - in: query
 *         name: OrderBy
 *         schema:
 *           type: string
 *         description: Field to order the results by (e.g., "name" or "date")
 *       - in: query
 *         name: SearchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter employees by name or details
 *       - in: query
 *         name: PageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: PageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of employees per page
 *       - in: query
 *         name: IsActive
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter employees by active status
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Unauthorized
 */

dictionaryRouter.get('/', getAlldictionary);

/**
 * @swagger
 * /dictionary/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
dictionaryRouter.get('/:id', getEmployee);

/**
 * @swagger
 * /dictionary:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       401:
 *         description: Unauthorized
 */
dictionaryRouter.post('/', createEmployee);

/**
 * @swagger
 * /dictionary/{id}:
 *   put:
 *     summary: Update an employee
 *     tags: [Employees]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
dictionaryRouter.put('/:id', updateEmployee);

/**
 * @swagger
 * /dictionary/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
dictionaryRouter.delete('/:id', deleteEmployee);

export default dictionaryRouter;