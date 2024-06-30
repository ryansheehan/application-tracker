import { PrismaClient, type User } from '@prisma/client';
import { dev } from '$app/environment'
import {POSTGRES_PRISMA_URL} from '$env/static/private';

// Declare global prisma variable to prevent multiple instances
// of Prisma Client in development due to hot reloading
const prisma = global.prisma || new PrismaClient({
    datasourceUrl: POSTGRES_PRISMA_URL
});

if (dev) {
    global.prisma = prisma;
}

export {
    prisma,
};
