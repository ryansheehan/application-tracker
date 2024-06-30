import {lucia} from './lucia';
import {getUserByEmail} from '$lib/server/prisma';
import {verifyPassword} from './hash';
import {CustomError, CustomErrorType} from '$lib/server/error';

export async function loginUser(email: string, password: string) {        
    const user = await getUserByEmail(email);    
    if (!user) {
        throw new CustomError(CustomErrorType.InvalidInput, "incorrect email or password");
    }
    if (!user.passwordHash) {
        throw new CustomError(CustomErrorType.InvalidInput, "incorrect account type")
    }
        
    const validPassword = await verifyPassword(user.passwordHash, password);
    if (!validPassword) {        
        throw new CustomError(CustomErrorType.InvalidInput, "incorrect email or password")
    }

    try {                
        const session = await lucia.createSession(user.id, {});        
        const sessionCookie = await lucia.createSessionCookie(session.id);               
        return sessionCookie;
    } catch(err) {
        console.log('unexpected error');
        console.log(err);
        const error = err instanceof Error ? err as Error : undefined;
        throw new CustomError(CustomErrorType.Internal, "Unable to create session", error);
    }
}
