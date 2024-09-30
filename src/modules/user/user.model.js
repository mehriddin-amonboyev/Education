import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username berilishi shart!"],
    },
    password: {
      type: String,
      unique: false,
      required: [true, "password berilishi shart!"],
    },
    phone: {
      type: String,
      required: false,
      minLength: [12, "Nomer 12 uzunlikda bo'lishi kerak"],
      maxLength: 12,
    },
    email: {
      type: String,
      unique: [true, "Email yagona bo'lishi kerak"],
    },
    role: {
      type: String,
      enum: {
        values: ["student", "teacher", "user"],
      },
      required: false,
      default: "user",
    },
    rating:{
      type: Number,
      default: 0
    },
    birthDate: {
      type: Date,
      required: false,
    },
    image_url: {
      type: String,
      required: false,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpireTime: {
      type: Date,
    }
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
