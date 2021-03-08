import { Router } from "express";
import Students from "../models/students.js";

const router = Router();

router.get("/api/students", async (req, res) => {
  try {
    const students = await Students.findAll({
      where: { deleted: false },
    });
    res.json(students);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Students.findByPk(id);

    res.json(student);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/api/students", async (req, res) => {
  try {
    const { name, birthdate } = req.body;

    const student = await Students.create({ name, birthdate });

    res.json(student);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/api/students/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Students.update({ deleted: true }, { where: { id } });

    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/api/students/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Students.update(
      { deleted: false },
      { where: { id } }
    );

    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

export default router;
