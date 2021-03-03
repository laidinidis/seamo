import { Sequelize } from "sequelize";
import sequelize from "../sequelize.js";

const Classes = sequelize.define(
  "Classes",
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

export default Classes;
