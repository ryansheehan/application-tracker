import {prisma} from '../prisma';
import { CustomError, CustomErrorType } from '../../error';

export async function getApplications(userId: string) {
    try {        
        const applications = await prisma.application.findMany({
            where: {userId},            
            select: {
                position: true,
                id: true,
                company: { select: {id: true, name: true}},
                events: { select: {id: true, type: true, date: true, notes: true}, orderBy: {date: 'desc'}},
                links: { select: {id: true, url: true, label: true}},
            },
        });                
        return applications;
    } catch (err) {
        console.error(err);
        throw new CustomError(CustomErrorType.Internal, "Failed to get applications");
    }
}