import type {NewUserData} from '../types'
import {prisma} from './prisma';


export async function getUserByEmail(email:string) {
    return await prisma.user.findUnique({
        where: {username: email}
    });
}

export async function getUserByEmailWithAccounts(email: string) {
    return await prisma.user.findUnique({
        where: {username: email},
        include: {
            accounts: true
        }
    });            
}

export async function createUserByPassword(userInfo: NewUserData, passwordHash: string) {
    const {email: username, ...userData} = userInfo;
    return await prisma.user.create({
        data: {
            ...userData,
            username,
            passwordHash,
        }
    })
}