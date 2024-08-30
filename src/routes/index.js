import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import adminRouter from "../modules/admin/admin.router.js";

const routes = Router();

routes
    .use("/users", userRoutes)
    .use("/auth", authRoutes)
    .use("/admin",adminRouter)

export default routes;
