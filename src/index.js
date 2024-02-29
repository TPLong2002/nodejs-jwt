import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import allowCrossDomain from "./config/configCROS";
import initApiRoutes from "./routes/api";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
env.config();

// const token = createToken({ username: "admin" });
// console.log(token, verifyToken(token));
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(cors({ credentials: true, origin: true }));

app.get("/", (req, res) => {
  console.log("cookie check", req.cookies);
  res.send("hello world");
});
configViewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port);
