import Joi from "joi";
import bcrypt from 'bcrypt';
import { User } from "../models/user.model.js";

class UserController {
    #_userModel

    constructor() {
        this.#_userModel = User
    }

    getAllUsers = async (req, res) => {
        const allUsers = await this.#_userModel.find();

        res.send({
            message: "Success",
            data: allUsers
        });
    };

    createUser = async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            await this.#_userModel.create({
                ...req.body,
                password: hashedPassword,
            });

            res.status(201).send({
                message: "success",
            });
        }catch(error){
            console.log("Userni create qilishda xatolik sodir bo'ldi", error)
        }
        };
};

export default new UserController()