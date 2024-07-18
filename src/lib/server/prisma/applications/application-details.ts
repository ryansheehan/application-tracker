import {prisma} from '../prisma';
import { CustomError, CustomErrorType } from '../../error';

export async function getApplicationDetails(id: string) {
    try {
        const application = await prisma.application.findUnique({
            where: { id },
            select: {
                id: true,
                position: true,
                userId: true,
                notes: true,
                links: { select: { id: true, url: true, label: true }},
                events: { select: { id: true, type: true, date: true, notes: true}, orderBy: { date: 'desc' }},
                company: {select: { id: true, name: true }}
            }
        })

        if (!application) {
            throw new CustomError(CustomErrorType.NotFound, "Application not found");
        }

        return application;
    } catch (err) {
        throw new CustomError(CustomErrorType.Internal, "Internal Error", err instanceof Error ? err : undefined);
    }
}
