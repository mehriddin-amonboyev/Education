import { Schema, model, SchemaType } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "First name berilisdhi shart..."],
        trim: true,
    },
    last_name: {
        type: String,
        // validate: {
        //     validator: function(value){
        //         console.log(/^[A-Za-z]+$/.test(value), value);
        //         return /^[A-Za-z]+$/.test(value);
        //     },
        //     message:(props) => `${props.value} faqat harflardan iborat`,
        // },
        trim: true,
        required: false,
    },
    phone: {
        type: String,
        required: true,
        minLength: [12, "Nomer uzunligi 12 bo'lishi kerak"],
        maxLength: 12,
    },
    role: {
        type: String,
        emun: {
            values: ["student", "teacher", "admin", "super-admin"],
        },
        required: true,
        default: "student",
    },
    
    // status: {
    //     type: String,
    //     // emun:{
    //     //     values:["active", "inactive"],
    //     //     message:"Status active yoki inactive bo'lishi kerak",
    //     // },
    //     required: false,
    // },

    birthDate: {
        type: Date,
        required: false,
    },
    image_url: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        unique: true,
        required: [true, "username berilishi shart"]
    },
    password: {
        type: String,
        unique: true,
        required: [true, "password berilishi shart"]
    },
},
    {
        collection: "users",
        timestamps: true,
    }

);

export const User = model("User", userSchema);