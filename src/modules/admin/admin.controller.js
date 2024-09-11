import { config } from 'dotenv';
import NodeCache from 'node-cache';
import { hash, compare } from 'bcrypt';
import { errorHandler } from '../../helper/errorHandler.js';
// import { adminValidator } from '../helper/validation.js'
import { generateTokens } from '../utils/token.js';
import { generateOTP } from '../utils/otp.js';
import { sendMail } from '../utils/mailer.js';
import Admin from '../schemas/admin.schema.js';
config();

const my_cache = new NodeCache();

class AdminController {

    async addAdmin(req, res) {
        try {
            const check_data = adminValidator.validate(req.body, { abortEarly: false });
            if (check_data.error) {
                return res.status(406).send({
                    error: check_data.error.details
                });
            }
            const { email, username, password, role } = check_data.value;
            const exist_email = await Admin.findOne({ email });
            if (exist_email) {
                return res.status(409).send({
                    error: "Email address already exist"
                });
            }
            const exist_username = await Admin.findOne({ username });
            if (exist_username) {
                return res.status(409).send({
                    error: "Username already exist"
                });
            }
            const hashed_password = await hash(password, 7);
            const new_admin = await Admin.create({
                email, username, hashed_password, role
            });
            return res.status(201).send({
                message: "Admin added successfully",
                data: new_admin
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(400).send({
                    error: "Email or password incorrect"
                });
            }
            const check_password = await compare(password, admin.hashed_password);
            if (!check_password) {
                return res.status(400).send({
                    error: "Email or password incorrect"
                });
            }
            const OTP = generateOTP();

            const mail_options = {
                from: process.env.MAIL_FROM,
                to: email,
                subject: 'Emailga Tasdiqlash kod yuborildi',
                html: `<h1 >${OTP}</h1>`
            };
            sendMail(mail_options);
            my_cache.set(email, OTP, 600);
            return res.status(200).send({
                massege: "Sent verification code to your email",
                data: OTP
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }
    async confirmOTP(req, res) {
        try {
            const { email, code } = req.body;
            const check_email = my_cache.get(email);
            if (!check_email) {
                return res.status(400).send({
                    error: "Invalid email or expire time"
                })
            }
            if (check_email != code) {
                return res.status(400).send({
                    error: "Invalid email or expire time"
                })
            }
            const admin = await Admin.findOne({ email });
            const payload = { id: admin._id, role: admin.role };
            const tokens = await generateTokens(payload);
            res.cookie('refresh_token', tokens?.refresh_token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).send({
                message: "Admin signed in successfully",
                token: tokens.access_token
            })
        } catch (error) {
            errorHandler(error, res);
        }
    }
}

export default new AdminController;
