import {lucia} from './lucia';
import {getUserByEmailWithAccounts, createUserByPassword} from '$lib/server/prisma';
import {CustomError, CustomErrorType} from '$lib/server/error'
import {hashPassword} from './hash';
import type {NewUserData} from '../types';

export async function registerUserByPassword(newUser: NewUserData, password: string)  {
    // see if the user already exists, and if so, see if they already registered by email and password
    // the user may have an oauth originated account and need to automatically link the accounts    
    const existingUser = await getUserByEmailWithAccounts(newUser.email);    
    // check to see if the account already has a password hash
    if (existingUser?.passwordHash) {        
        throw new CustomError(CustomErrorType.InvalidInput, "User account already exists with a password");
    }

    const passwordHash = await hashPassword(password);

    try {        
        const user = await createUserByPassword(newUser, passwordHash);
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = await lucia.createSessionCookie(session.id);        
        return sessionCookie;
    } catch(err) {
        const error = err instanceof Error ? err as Error : undefined;
        throw new CustomError(CustomErrorType.Internal, "Unable to create user or session by password", error);
    }
}
