import {redirect} from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
	if (!locals.user?.username) redirect(302, "/");
	return {
		username: locals.user.username
	};
};
