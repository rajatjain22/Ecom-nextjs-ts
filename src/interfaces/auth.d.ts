export interface SessionUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
    role: string;
}