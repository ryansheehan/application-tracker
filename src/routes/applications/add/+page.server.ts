import { superValidate, message, type ErrorStatus } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { schema } from './application-form-schema';
import {addApplication, type NewAppliction} from '$lib/server/prisma';
import {CustomError, CustomErrorType} from '$lib/server/error';


export const load: PageServerLoad = async ({locals}) => {
    if (!locals?.user?.username) { return redirect(302, "/"); }

    const testData = {
        company: "My Test Company",
        position: "Software Engineer",
        links: [{label: 'Google', url: 'https://www.google.com'}]
    }

    return {
        form: await superValidate(testData, zod(schema))
    };
}

export const actions: Actions = {
    default: async ({request, locals}) => {
        const form = await superValidate(request, zod(schema));

        if (!locals?.user?.username) { return fail(403, {form})}

        const {company, position, links} = form.data;

        const newApplication: NewAppliction = {
            company,
            position,
            links,
        }
        
        const userId = locals.user.id;

        try {
            const application = await addApplication(newApplication, userId);
            console.log('application saved', application.company);
        } catch (err) {
            const error = CustomError.coerce(err);
            if (error) {
                switch (error.type) {
                    case CustomErrorType.InvalidInput:
                        return message(form, error.message, {status: 400});
                    case CustomErrorType.Internal:
                        return message(form, "Internal Server Error", {status: 500});
                }
            }
            console.log(err);
            return message(form, "Internal Server Error", {status: 500});
        }

        console.log('successfully added application');
        return message(form, {status: 'created'});
    }
}