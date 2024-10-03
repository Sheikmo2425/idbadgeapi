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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verifyOTP = exports.requestOTP = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../utils/auth");
const __1 = require("..");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield __1.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role
            }
        });
        res.status(201).json({ message: 'User created successfully', userId: user.id });
    }
    catch (error) {
        res.status(400).json({ error: 'Username or email already exists' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield __1.prisma.user.findUnique({ where: { username } });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        req.session.userId = user.id;
        res.json({ message: 'Logged in successfully' });
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
exports.login = login;
const requestOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const employee = yield __1.prisma.employee.findUnique({ where: { email } });
    if (employee) {
        const otp = (0, auth_1.generateOTP)();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        yield __1.prisma.oTP.create({
            data: {
                email,
                otp,
                expiresAt
            }
        });
        try {
            yield (0, auth_1.sendOTPEmail)(email, otp);
            res.json({ message: 'OTP sent successfully' });
        }
        catch (error) {
            console.error('Failed to send OTP:', error);
            res.status(500).json({ error: 'Failed to send OTP' });
        }
    }
    else {
        res.status(404).json({ error: 'Employee not found' });
    }
});
exports.requestOTP = requestOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const validOTP = yield __1.prisma.oTP.findFirst({
        where: {
            email,
            otp,
            expiresAt: { gt: new Date() }
        }
    });
    if (validOTP) {
        const employee = yield __1.prisma.employee.findUnique({ where: { email } });
        if (employee) {
            req.session.employeeId = employee.id;
            yield __1.prisma.oTP.delete({ where: { id: validOTP.id } });
            yield __1.prisma.employee.update({
                where: { id: employee.id },
                data: { lastLogin: new Date() }
            });
            res.json({ message: 'Logged in successfully' });
        }
        else {
            res.status(404).json({ error: 'Employee not found' });
        }
    }
    else {
        res.status(401).json({ error: 'Invalid or expired OTP' });
    }
});
exports.verifyOTP = verifyOTP;
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ error: 'Could not log out' });
        }
        else {
            res.json({ message: 'Logged out successfully' });
        }
    });
};
exports.logout = logout;
