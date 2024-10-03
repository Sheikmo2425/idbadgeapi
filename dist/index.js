"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const client_1 = require("@prisma/client");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const login_1 = __importDefault(require("./routers/login"));
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
// Swagger documentation route
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use('/auth', login_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
