import { Router } from "express";
import testController from "./test.controller.js";


const testRoutes = Router();

testRoutes
    .post('/', testController.createTest)
    .get('/',  testController.getAllTests)
    .get('/:id',  testController.getTestById)
    .delete('/:id',  testController.deleteTest)

export default testRoutes