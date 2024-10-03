import { PrismaClient } from "@prisma/client";

// context.ts

export class Context {
    prisma: PrismaClient = new PrismaClient();

    constructor(public someContextVariable: string) {}

    log(message: string) {
        console.log(this.someContextVariable, { message });
    }
}
