import { Sequelize } from "sequelize";
import sequelize from "../sequelize.js";

import Students from "./students.js";
import Classes from "./classes.js";

const Grades = sequelize.define(
  "grades",
  {
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quarter: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    grade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Students.hasMany(Grades);
Grades.belongsTo(Students);

Classes.hasMany(Grades);
Grades.belongsTo(Classes);

export default Grades;
