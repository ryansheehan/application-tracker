export enum CustomErrorType {    
    Forbidden,
    NotFound,
    InvalidInput,
    Internal,
}

export class CustomError extends Error {  
    static coerce(err: unknown) {
        if (err instanceof CustomError) return err as CustomError;
        return null;
    }  

    constructor(public readonly type:CustomErrorType, message: string, cause?: Error) {
        super(message, {cause});
    }
}
