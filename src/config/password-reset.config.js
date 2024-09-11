import { config } from 'dotenv';

config();

export const passwordResetConfig = {
    expireTime: process.env.PASSWORD_RESET_TIME
    }