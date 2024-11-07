export interface MessageType {
    GENERAL: {
        SUCCESS: string;
        FAILURE: string;
        INVALID_REQUEST_BODY: string;
        INVALID_REQUEST: string;
    };
    PRISMA: {
        UNIQUE_CONSTRAINT: string;
        FOREIGN_KEY_CONSTRAINT: string;
        VALIDATION_ERROR: string;
        RUST_PANIC: string;
        INITIALIZATION_ERROR: string;
        NOT_FOUND: string;
        UNKNOWN_ERROR: string;
        CONNECTION_ERROR: string;
    },
    USER: {
        CREATED: string;
        UPDATED: string;
        DELETED: string;
        EMAIL_ALREADY_EXISTS: string;
        EMAIL_INVALID: string;
        PHONE_ALREADY_EXISTS: string;
        NOT_FOUND: string;
        INCORRECT_PASSWORD: string;
    };
    PRODUCT: {
        CREATED: string;
        UPDATED: string;
        DELETED: string;
        PRODUCT_ALREADY_EXISTS: string;
        NOT_FOUND: string;
    };
    AUTH: {
        NO_TOKEN_FOUND: string;
        TOKEN_EXPIRED: string;
        UNAUTHORIZED: string;
        ACCESS_DENIED: string;
    };
    DB_FAILURE: string;
    SERVER_ERROR: string;
}