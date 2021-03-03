import { Router } from "express";
import Grades from "../models/grades.js";

const router = Router();

router.get("/api/grades", async (req, res) => {
  try {
    const grades = await Grades.findAll();
    res.json({
      message: "Success",
      data: grades,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/api/grades/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const grades = await Grades.findByPk(id);

    res.json({
      message: "Success",
      data: grades,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/api/grades", async (req, res) => {
  try {
    const { year, quarter, grade, studentId, classId } = req.body;

    const grades = await Grades.create({
      year,
      quarter,
      grade,
      studentId,
      classId,
    });

    res.json({
      message: "Grades created",
      data: grades,
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
