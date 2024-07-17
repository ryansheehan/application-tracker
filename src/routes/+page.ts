import type {PageLoad} from './$types';
import {redirect} from '@sveltejs/kit';

export const load: PageLoad = async ({parent}) => {
    const {isUserLoggedIn} = await parent();

    if (isUserLoggedIn) {
        return redirect(302, '/applications');
    }
};