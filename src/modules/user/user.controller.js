import bcrypt from "bcrypt";
import { isValidObjectId } from "mongoose";
import User from "./user.model.js";
import ApiFeature from "../../utils/api-feature.utils.js";
import bcryptConfig from "../../config/bcrypt.config.js";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";
import { ConflictException } from "../../exceptions/conflic.exception.js";

class UserController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const query = { ...req.query };

      // console.log(req.cookies, "oddiy cookies");

      // console.log(req.signedCookies, "secret cookies");

      // GET ALL FILTERED PRODUCTS COUNT
      const allResultsCount = await new ApiFeature(
        this.#_userModel.find(),
        query
      )
        .filter()
        .sort("birthDate")
        .limitFields()
        .getQuery()
        .countDocuments();

      // EXECUTE QUERY
      const allFilteredUsers = await new ApiFeature(
        this.#_userModel.find(),
        query
      )
        .filter()
        .sort("birthDate")
        .limitFields()
        .paginate()
        .getQuery()
        .select("-password");

      res.send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResultsCount,
        data: allFilteredUsers,
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      if (req.role == "admin") {
        if (req.body.role == "admin" || req.body.role == "super-admin") {
          throw new ConflictException(
            "You are not allowed to create admin or super-admin users"
          );
        }
      }
      const hashedPass = await bcrypt.hash(
        req.body.password,
        bcryptConfig.rounds
      );

      await this.#_userModel.create({
        ...req.body,
        password: hashedPass,
      });

      res.status(201).send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { username, password, phone, birthDate, image_url } =
        req.body;

      let newPasswordHash = undefined;

      if (password) {
        newPasswordHash = await bcrypt.hash(req.body.password, bcryptConfig.rounds);
      }

      const { id } = req.params;

      // check id
      this.#_checkObjectId(id);

      await this.#_userModel.findByIdAndUpdate(id, {
        username,
        password: newPasswordHash,
        phone,
        birthDate,
        image_url,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  updateUserRole = async (req, res, next) => {
    try {
      const { role } = req.body;
      const { id } = req.params;

      // check id
      this.#_checkObjectId(id);

      await this.#_userModel.findOneAndUpdate({ _id: id }, { role });

      res.status(204).send({
        message: "User roli muvaffaqqiyatli o'zgartirildi!!"
      });
    } catch (error) {
      next(error);
    }
  };


  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      // check id
      this.#_checkObjectId(id);

      await this.#_userModel.findByIdAndDelete(id);

      res.status(204).send({
        message: "User muvaffaqqiyatli o'chirildi!!",
      });
    } catch (error) {
      next(error);
    }
  };

  #_checkObjectId = (id) => {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Given ${id} is not a valid ObjectID`);
    }
  };
}

export default new UserController();
