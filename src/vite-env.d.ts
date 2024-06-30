/// <reference types="vite/client" />

interface ImportMetaEnv {    
    readonly POSTGRES_DATABASE: string,
    readonly POSTGRES_HOST: string,
    readonly POSTGRES_PASSWORD: string,
    readonly POSTGRES_PRISMA_URL: string,
    readonly POSTGRES_URL: string,
    readonly POSTGRES_URL_NON_POOLING: string,
    readonly POSTGRES_URL_NO_SSL: string,
    readonly POSTGRES_USER: string,

    readonly NODE_ENV: "development" | "production",
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
