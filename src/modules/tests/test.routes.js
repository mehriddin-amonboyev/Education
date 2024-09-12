import { Router } from "express";
import testController from "./test.controller.js";
import { createTestSxema } from "./dtos/test-create.dtos.js";
import { CheckAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import ValidationMiddleware from "../../middleware/validation.middleware.js";


const testRoutes = Router();

testRoutes
    .post("/",
        CheckAuthGuard(true),
        CheckRolesGuard("teacher", "super-admin", "admin"),
        ValidationMiddleware(createTestSxema),
        testController.createTest
    )
    .get("/",
        CheckAuthGuard(false),
        CheckRolesGuard(),
        testController.getAllTests)
    .get("/:id",
        CheckAuthGuard(true),
        CheckRolesGuard(),
        testController.getTestById)
    .delete("/:id",
        CheckAuthGuard(true),
        CheckRolesGuard("teacher", "admin"),
        testController.deleteTest)

export default testRoutes