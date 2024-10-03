"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const client_1 = require("@prisma/client");
// context.ts
class Context {
    constructor(someContextVariable) {
        this.someContextVariable = someContextVariable;
        this.prisma = new client_1.PrismaClient();
    }
    log(message) {
        console.log(this.someContextVariable, { message });
    }
}
exports.Context = Context;
