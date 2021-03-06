import { Sequelize } from "sequelize";
import sequelize from "../sequelize.js";

const Students = sequelize.define(
  "students",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthdate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Students;
