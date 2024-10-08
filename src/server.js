import path from 'path';
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import expressEjsLayouts from 'express-ejs-layouts';
import appConfig from './config/app.config.js';
import { mongoDB } from "./mongo/mongo.js";
import routes from "./routes/index.js";
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

//MORGAN MIDDLEWARE
app.use(morgan("tiny"));

app.use(cookieParser("Amonboyev"))
//SET VIEW ENGINE TO EJS
app.set("view engine", "ejs");

// app.use(expressEjsLayouts)
// app.set("layouts", path.join(process.cwd(),"src","views","layouts","dashboard"))
//SET EJS FILE PATH    
app.set("views", path.join(process.cwd(), "src", "views"));

//SERVER STATIC FILES IN PUBLIC DIRECTORY -> MIDDLEWARE
app.use("/public", express.static(path.join(process.cwd(), "public")));

//BODY PARSING MIDDLIWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CONNECTING TO MONGODB DATABASE 
mongoDB()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Xatolik >>>>>>>>\n", err.message));

// Api ROUTES
app.use("/", routes);

//Api All
app.all("*", (req, res) => {
    res.status(404).send({
        message: `Berilgan ${req.url} manzil mavjud emas!`,
    });
});

// ERRORHANDLER MIDDLEWARE 
// app.use(ErrorHandlerMiddleware);

//SEVER LISSENING PORT
app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Listen on port ${appConfig.port}`)
});
