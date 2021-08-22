import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import methodOverride from "method-override";
import IBusiness from './business/IBusiness';
import Controllers from './controllers';
import container from './inversify.config';
import { errorHandler } from './helpers/errorHandler';
import { TypeNames } from './constants/TypeNames';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();
const router = express.Router();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());
app.use("/api", router);

const business = container.get<IBusiness>(TypeNames.IBusiness);

new Controllers().registerRoutes(router, business);

app.use(errorHandler);


// ## It is not safe to resume normal operation after 'uncaughtException'. Restart the process carefully using a process management tool like PM2
// https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
process.on("uncaughtException", (err) => {
  process.exit(-1);
});

// ## Catch unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  process.exit(-1);
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));