import { redirect} from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {getApplications} from '$lib/server/prisma';

export const load: PageServerLoad = async ({locals, depends}) => {
    depends('applications');

    if (!locals?.user?.username) { return redirect(302, "/"); }

    const applications = await getApplications(locals.user.id);

    return {
        applications
    };
}


