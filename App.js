import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentsRoutes from "./Kanbas/assignments/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/users/routes.js";
import session from "express-session";
import "dotenv/config";
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas-db";
console.log(CONNECTION_STRING);
console.log(process.env.FRONTEND_URL)
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, 
    maxAge: 3600000, 
  },
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    // domain: process.env.HTTP_SERVER_DOMAIN,
    
  };
  sessionOptions.cookie.sameSite = "none";

}

app.use(session(sessionOptions));

app.use(express.json());
Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
