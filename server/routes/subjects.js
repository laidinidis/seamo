import { Router } from "express";
import Subjects from "../models/subjects.js";

const router = Router();

router.get("/api/subjects", async (req, res) => {
  try {
    const subjects = await Subjects.findAll();
    res.json(subjects);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/api/subjects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subjects.findByPk(id);

    res.json(subject);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/api/subjects", async (req, res) => {
  try {
    const { name } = req.body;

    const subject = await Subjects.create({ name });

    res.json(subject);
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

export default router;
