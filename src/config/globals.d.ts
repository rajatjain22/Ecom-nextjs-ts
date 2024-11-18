import { PrismaClient } from '@prisma/client';

declare global {
  // This is to declare a global variable 'prisma' on the global object.
  var prisma: PrismaClient | undefined;
}

export {};