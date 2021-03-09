import { Sequelize } from "sequelize";
import sequelize from "../sequelize.js";

import Students from "./students.js";
import Subjects from "./subjects.js";

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

Subjects.hasMany(Grades);
Grades.belongsTo(Subjects);

export default Grades;
