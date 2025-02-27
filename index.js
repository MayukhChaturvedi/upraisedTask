import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";
import fs from "fs";
import path from "path";
import userRouter from "./routes/userRouter.js";
import gadgetRouter from "./routes/gadgetRouter.js";
import { fileURLToPath } from "url";
import createError from "http-errors";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "access.log"),
	{ flags: "a" }
);
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	legacyHeaders: false,
});
const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
logger.token("error", (req) => req.error || "-");
app.use(logger("combined", { stream: accessLogStream }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(limiter);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/users", userRouter);
app.use("/api/gadgets", gadgetRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	req.error = err.message;
	res.status(err.status || 500).json({ error: err.message });
	next(err);
});
