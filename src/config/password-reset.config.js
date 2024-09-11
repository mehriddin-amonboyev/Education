import { config } from 'dotenv';

config();

const passwordResetConfig = {
    expireTime: process.env.PASSWORD_RESET_TIME,
};

export default passwordResetConfig;