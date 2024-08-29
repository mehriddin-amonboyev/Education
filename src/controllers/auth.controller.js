import bcrypt from 'bcrypt';
import { User } from "../models/user.model.js";
import { signToken } from '../helper/jwt.helper.js';

class AuthController {
    #_userModel;

    constructor() {
        this.#_userModel = User;
    }

    //LOGIN
    signin = async (req, res) => {
        const foundedUser = await this.#_userModel.findOne({
            username: req.body.username,
        });
        if (!foundedUser) {
            return res.status(404).send({
                message: "User not found",
            })
        }
        const result = await bcrypt.compare(
            req.body.password,
            foundedUser.password
        );
        if (!result) {
            return res.status(409).send({
                message: "Invalid password or username"
            });
        };
        const token = signToken();

        res.send({
            message: "success",
            data: foundedUser
        });

    };

    //REGISTER
    signup = async (req, res) => {
        res.send("signup hali tayyormas")
    }
}
export default new AuthController;