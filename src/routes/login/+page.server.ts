import {z} from 'zod';
import { superValidate, message, type ErrorStatus } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from "./$types";
import {loginUser} from '$lib/server/lucia';
import {CustomError, CustomErrorType} from '$lib/server/error';

const schema = z.object({
    email: z.string({
        message: "Invalid email"
    }).email(),
    password: z.string({
        message: "Incorrect username or password"
    }).min(8).max(255),
});


export const load: PageServerLoad = async ({locals}) => {
    if (locals?.user?.username) { return redirect(302, "/"); }

    const testData = {
		email: 'rsheehan@gmail.com',
		password: 'Password@1',		
	};
    return {
        form: await superValidate(testData, zod(schema))
    };
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(schema));
        if (!form.valid) return fail(400, {form});

        const {email, password} = form.data;
    
        try {
            const sessionCookie = await loginUser(email, password);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });                                 
        } catch(err) {
			let errorCode: ErrorStatus = 500;
			let response = "Internal Server Error";
			const error = CustomError.coerce(err);
			if (error) {
				switch(error.type) {
					case CustomErrorType.InvalidInput:
						errorCode = 400;				
						response = error.message;	
						break;
					case CustomErrorType.Internal:
						errorCode = 500;
						response = "Internal Server Error";
						break;
				}			
			}
			return message(form, response, {status: errorCode});			
		}        
        
        redirect(302, "/");                        
    }
}