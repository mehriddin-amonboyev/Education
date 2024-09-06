import { Router } from "express";
import AdminController from './admin.controller.js';

const  adminRouter = Router();

adminRouter
    .post('/add', AdminController.addAdmin)
    .post('/signin', AdminController.signin)
    .post('/confirm-otp', AdminController.confirmOTP);

export default adminRouter;
