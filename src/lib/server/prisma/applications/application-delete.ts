import {prisma} from '../prisma';
import { CustomError, CustomErrorType } from '$lib/server/error';

export async function deleteApplication(id: string) {
    try {
        const deletedApplication = await prisma.application.delete({
            where: { id }
        });        
        return deletedApplication;
    } catch (err) {
        throw new CustomError(CustomErrorType.Internal, "Failed to delete application", err instanceof Error ? err : undefined);
    }
}
