import {prisma} from '../prisma';
import { CustomError, CustomErrorType } from '../../error';

export async function getApplications(userId: string) {
    try {        
        const applications = await prisma.application.findMany({
            where: {userId},
            include: {
                company: {select: {id: true, name: true}},
                events: {orderBy: {date: 'desc'}},
                links: {select: {url: true, label: true}},
            }
        });                
        return applications;
    } catch (err) {
        console.error(err);
        throw new CustomError(CustomErrorType.Internal, "Failed to get applications");
    }
}