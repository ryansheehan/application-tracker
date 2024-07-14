import type { PageServerLoad } from './$types';
import {redirect} from '@sveltejs/kit';
import {getApplicationDetails} from '$lib/server/prisma';

export const load: PageServerLoad = async ({locals, params}) => {
    if (!locals?.user?.username) { return redirect(302, "/"); }

    const applicationData = await getApplicationDetails(params.id);

    if (!applicationData) {
        return redirect(302, '/applications');
    }

    if (applicationData.userId !== locals.user.id) {
        return redirect(403, '/applications');
    }

    const {userId: _, ...application} = applicationData;
    
    return {
        application
    }
}