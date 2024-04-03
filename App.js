// const express = require('express')
import Hello from "./Hello.js"
import Lab5 from "./Lab5.js";
import cors from "cors";
import express from 'express';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentsRoutes from "./Kanbas/assignments/routes.js";

const app = express()
app.use(cors());
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
Hello(app);

Lab5(app);


// app.listen(4000)
app.listen(process.env.PORT || 4000);