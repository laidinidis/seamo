import { Router } from "express";
import Classes from "../models/classes.js";

const router = Router();

router.get("/api/classes", async (req, res) => {
  try {
    const classes = await Classes.findAll();
    res.json({
      message: "Success",
      data: classes,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/api/classes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Classes.findByPk(id);

    res.json({
      message: "Success",
      data: subject,
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.post("/api/classes", async (req, res) => {
  try {
    const { name } = req.body;

    const subject = await Classes.create({ name });

    res.json({
      message: "Class created",
      data: subject,
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
