import { hash, verify } from "@node-rs/argon2";

export const hashOpts = {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
}

export async function hashPassword(password: string) {
    return await hash(password, hashOpts);
}

export async function verifyPassword(hashPassword: string, password: string) {
    return await verify(hashPassword, password, hashOpts)
}
