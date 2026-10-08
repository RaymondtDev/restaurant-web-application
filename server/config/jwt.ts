import "dotenv/config";

const ADMIN_ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET as string;
const ADMIN_REFRESH_TOKEN_SECRET = process.env.ADMIN_REFRESH_TOKEN_SECRET as string;

const USER_ACCESS_TOKEN_SECRET = process.env.USER_ACCESS_TOKEN_SECRET as string;
const USER_REFRESH_TOKEN_SECRET = process.env.USER_REFRESH_TOKEN_SECRET as string;

// if (
//   !ADMIN_ACCESS_TOKEN_SECRET || 
//   !USER_ACCESS_TOKEN_SECRET ||
//   !ADMIN_REFRESH_TOKEN_SECRET
// ) throw new Error("Missing critical environment variable: JWT_SECRET must be defined.");

export const ADMIN_ACCESS_TOKEN_SECRET_KEY: string = ADMIN_ACCESS_TOKEN_SECRET;
export const ADMIN_REFRESH_TOKEN_SECRET_KEY: string = ADMIN_REFRESH_TOKEN_SECRET;

export const USER_ACCESS_TOKEN_SECRET_KEY: string = USER_ACCESS_TOKEN_SECRET;
export const USER_REFRESH_TOKEN_SECRET_KEY: string = USER_REFRESH_TOKEN_SECRET;