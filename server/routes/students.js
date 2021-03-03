import { Router } from "express";
import Students from "../models/students.js";

const router = Router();

router.get("/api/student", async (req, res) => {
  try {
    const students = await Students.findAll();
    res.json({
      message: "Success",
      data: students,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/api/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Students.findByPk(id);

    res.json({
      message: "Success",
      data: student,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/api/student", async (req, res) => {
  try {
    const { name } = req.body;

    const student = await Students.create({ name });

    res.json({
      message: "Student created",
      data: student,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

export default router;
