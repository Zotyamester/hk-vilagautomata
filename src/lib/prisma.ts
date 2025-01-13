import { PrismaClient } from '@prisma/client';

const options: any = process.env.NODE_ENV === 'development' ? { log: ['query'] } : {};
const prisma = new PrismaClient();

export default prisma;
