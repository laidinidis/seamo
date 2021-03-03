import { Sequelize } from "sequelize";
import sequelize from "../sequelize.js";

const Students = sequelize.define(
  "Students",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Students;
