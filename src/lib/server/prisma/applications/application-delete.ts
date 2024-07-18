import {prisma} from '../prisma';
import { CustomError, CustomErrorType } from '$lib/server/error';

export async function deleteApplication(id: string) {
    try {
        const deletedApplication = await prisma.application.delete({
            where: { id },
            select: {
                id: true,
                position: true,  
                notes: true,              
                links: { select: { id: true, url: true, label: true }},
                events: { select: { id: true, type: true, date: true, notes: true}, orderBy: { date: 'desc' }},
                company: {select: { id: true, name: true }}
            }
        });        
        return deletedApplication;
    } catch (err) {
        throw new CustomError(CustomErrorType.Internal, "Failed to delete application", err instanceof Error ? err : undefined);
    }
}
