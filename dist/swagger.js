"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee Management API',
            version: '1.0.0',
            description: 'API documentation for the Employee Management system',
        },
        servers: [
            {
                url: 'http://localhost:3002',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                sessionAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid'
                }
            },
            schemas: {
                Employee: {
                    type: 'object',
                    required: ['fullName', 'displayName', 'department', 'designation', 'country', 'email', 'grade', 'employeeType', 'joinDate', 'company', 'dateOfBirth'],
                    properties: {
                        id: { type: 'string' },
                        fullName: { type: 'string' },
                        displayName: { type: 'string' },
                        department: { type: 'string' },
                        designation: { type: 'string' },
                        country: { type: 'string' },
                        email: { type: 'string' },
                        pictureUrl: { type: 'string' },
                        grade: { type: 'string' },
                        employeeType: { type: 'string' },
                        joinDate: { type: 'string', format: 'date' },
                        lastWorkingDate: { type: 'string', format: 'date' },
                        firstLogin: { type: 'string', format: 'date-time' },
                        lastLogin: { type: 'string', format: 'date-time' },
                        company: { type: 'string' },
                        dateOfBirth: { type: 'string', format: 'date' },
                        managerId: { type: 'string' }
                    }
                },
                User: {
                    type: 'object',
                    required: ['username', 'email', 'role'],
                    properties: {
                        id: { type: 'string' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./src/routers/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
