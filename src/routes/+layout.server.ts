import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({locals, depends}) => {
    depends(`app:session`);

    return {
        isUserLoggedIn: !!locals.session,
    }
};
