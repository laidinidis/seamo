import { Sequelize } from "sequelize";
import sequelize from "../sequelize.js";

const Subjects = sequelize.define(
  "subjects",
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

export default Subjects;
