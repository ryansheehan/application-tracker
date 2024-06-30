import type {Handle} from '@sveltejs/kit';
import {sequence} from '@sveltejs/kit/hooks';
import {auth} from '$lib/server/auth.hook';

export const handle: Handle = sequence(
    auth,
);
