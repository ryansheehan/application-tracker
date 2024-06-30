import type {Handle} from '@sveltejs/kit';
import {lucia} from '$lib/server/lucia';

export const auth: Handle = async ({event, resolve}) => {
    console.log('auth hook');
    const sessionId = event.cookies.get(lucia.sessionCookieName);
    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const {session, user} = await lucia.validateSession(sessionId);
    
    console.log('SESSION:');
    console.log(session);

    if (session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        // sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });
    }

    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
    }

    event.locals.user = user;
    event.locals.session = session;

    return resolve(event);
}
