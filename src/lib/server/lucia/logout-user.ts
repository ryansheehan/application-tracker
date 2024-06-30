import {lucia} from './lucia';

export async function logoutUser(sessionId: string) {
    await lucia.invalidateSession(sessionId);
    return lucia.createBlankSessionCookie();
}
