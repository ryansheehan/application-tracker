export interface NewUserData {
    email: string;
}

export interface NewAppliction {
    company: string;
    position: string;
    links: {label: string, url:string}[];
}

