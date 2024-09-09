import {Schema, model} from 'mongoose';

const TestSchema = new Schema({
    matni: {
        type: String,
        required: true
    },
    mavzu_nomi: {
        type: String,
        required: true
    },
    qiyinchilik_darajasi: {
        type: String,
        enum: ["Oddiy", "O'rta", "Qiyin"], // faqat ushbu qiymatlarni qabul qiladi
        required: true
    },
    A: {
        type: String,
        required: true
    },
    B: {
        type: String,
        required: true
    },
    C: {
        type: String,
        required: true
    },
    D: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        enum: ['A', 'B', 'C', 'D'], // To'g'ri javobni tanlash uchun
        required: true
    }
});

export const Test = model('Test', TestSchema);