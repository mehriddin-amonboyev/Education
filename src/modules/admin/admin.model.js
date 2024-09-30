import { Schema, model } from "mongoose";

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['super-admin', 'admin'],
            default: 'super-admin'
        }
    },
    {
        versionKey: false
    }
);

const Admin = model('Admin', adminSchema);
export default Admin;
