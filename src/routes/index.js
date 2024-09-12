import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import testRoutes from "../modules/tests/test.routes.js";
// import adminRouter from "../modules/admin/admin.router.js";

const routes = Router();

routes
    .use("/auth", authRoutes)
    .use("/users", userRoutes)
    .use("/tests", testRoutes);

export default routes;
