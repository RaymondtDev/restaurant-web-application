import "dotenv/config";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const USER_JWT_SECRET = process.env.USER_JWT_SECRET;

if (!ADMIN_JWT_SECRET || !USER_JWT_SECRET) throw new Error("Missing critical environment variable: JWT_SECRET must be defined.");

export const ADMIN_JWT_SECRET_KEY: string = ADMIN_JWT_SECRET;
export const USER_JWT_SECRET_KEY: string = USER_JWT_SECRET;