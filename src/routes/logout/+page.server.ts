import { logoutUser } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		
		const sessionCookie = await logoutUser(event.locals.session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
};
