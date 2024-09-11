import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
// import adminRouter from "../modules/admin/admin.router.js";

const routes = Router();

routes
    .use("/auth", authRoutes)
    .use("/users", userRoutes)
// .use("/admin", adminRouter);

export default routes;
