import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const routes = Router();

routes
    .use("/users", userRoutes)
    .use("/auth", authRoutes)

export default routes;
