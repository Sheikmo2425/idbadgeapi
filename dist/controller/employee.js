"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getEmployees = void 0;
const __1 = require("..");
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield __1.prisma.employee.findMany();
    console.log('sd', employees);
    res.json(employees);
});
exports.getEmployees = getEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const employee = yield __1.prisma.employee.findUnique({ where: { id } });
    if (employee) {
        res.json(employee);
    }
    else {
        res.status(404).json({ error: 'Employee not found' });
    }
});
exports.getEmployee = getEmployee;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, displayName, department, designation, country, email, pictureUrl, grade, employeeType, joinDate, company, dateOfBirth, managerId } = req.body;
    const employee = yield __1.prisma.employee.create({
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
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { fullName, displayName, department, designation, country, email, pictureUrl, grade, employeeType, joinDate, lastWorkingDate, company, dateOfBirth, managerId } = req.body;
    const employee = yield __1.prisma.employee.update({
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
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield __1.prisma.employee.delete({ where: { id } });
    res.status(204).send();
});
exports.deleteEmployee = deleteEmployee;
