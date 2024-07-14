import type {RequestHandler} from './$types';
import {error} from '@sveltejs/kit';
import {deleteApplication} from '$lib/server/prisma';

export const DELETE: RequestHandler = async ({params, locals}) => {
    if (!locals.user?.id) {
        return error(403, {message: "Unauthorized"});
    }

    const id = params.id;

    try {
        await deleteApplication(id);
        return new Response(null, {status: 204});
    } catch (err) {
        return error(500, {message: "Internal Server Error"});
    }    
}
