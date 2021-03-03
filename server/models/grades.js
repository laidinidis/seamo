import { Sequelize } from "sequelize";
import sequelize from "../sequelize.js";

const Grades = sequelize.define(
  "Grades",
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
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    classId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Grades;
