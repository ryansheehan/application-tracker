import { z } from 'zod';
import { superValidate, message, type ErrorStatus } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { registerUserByPassword } from '$lib/server/lucia';
import {CustomError, CustomErrorType} from '$lib/server/error';
import type { Actions, PageServerLoad } from "./$types";

// require 1 capital letter, 1 lower case letter, 1 number, 1 special character 
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(255),
	confirmPassword: z.string(),
}).superRefine((val, ctx) => {
	const {password, confirmPassword} = val;
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "The password does not match",
			path: ['confirmPassword']
		});
	}
	
	const result = passwordRegex.test(password)
	
	if (!result) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Password must be at least 8 characters and contain at least one uppercase letter, lowercase letter, number, and special character.",
			path: ['password']
		})
	}

});

export const load: PageServerLoad = async () => {
	const testData = {
		email: 'rsheehan@gmail.com',
		password: 'Password@1',
		confirmPassword: 'Password@1'
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
			const sessionCookie = await registerUserByPassword({email}, password);			
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
