import { Sequelize } from "sequelize";

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

const sequelize = new Sequelize("postgres", POSTGRES_USER, POSTGRES_PASSWORD, {
  dialect: "postgres",
  dialectOptions: {
    // Your pg options here
  },
});

export default sequelize;
