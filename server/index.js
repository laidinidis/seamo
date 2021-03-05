import express from "express";
import cors from "cors";

import sequelize from "./sequelize.js";
import studentRoutes from "./routes/students.js";
import classesRoutes from "./routes/classes.js";
import gradesRoutes from "./routes/grades.js";

const APP_PORT = 4000;

(async () => {
  try {
    try {
      await sequelize.sync();
      console.log("Connected to db");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    const app = express();
    // remove x-powered-by header from headers
    app.disable("x-powered-by");

    // enable cors
    app.use(cors());

    // json requests handling
    app.use(express.json());

    // routes
    app.use(studentRoutes);
    app.use(classesRoutes);
    app.use(gradesRoutes);

    app.listen(APP_PORT, () => {
      console.log(`App listening http://localhost:${APP_PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
})();
