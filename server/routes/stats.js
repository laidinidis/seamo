import { Router } from "express";
import Grades from "../models/grades.js";
import Classes from "../models/classes.js";

const router = Router();

router.get("/api/statistics/student/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const grades = await Grades.findAll({
      where: { studentId: id },
    });

    const stats = grades
      .reduce((acc, cur) => {
        const key = `${cur.year}_${cur.quarter}`;
        const index = acc.findIndex((x) => x.key === key);

        if (index >= 0) {
          acc[index] = {
            key,
            label: `${cur.year} - Q${cur.quarter}`,
            sum: acc[index].sum + cur.grade,
            count: acc[index].count + 1,
          };
        } else {
          acc.push({
            key,
            label: `${cur.year} - Q${cur.quarter}`,
            sum: cur.grade,
            count: 1,
          });
        }
        return acc;
      }, [])
      .map((x) => ({
        key: x.key,
        label: x.label,
        avg: (x.sum / x.count).toFixed(1),
      }));

    stats.sort((a, b) => (a.key > b.key ? 1 : -1));

    res.json({
      message: "Success",
      data: stats,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/api/statistics/class/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const grades = await Grades.findAll({
      where: { classId: id },
    });

    const stats = grades
      .reduce((acc, cur) => {
        const key = `${cur.year}_${cur.quarter}`;
        const index = acc.findIndex((x) => x.key === key);

        if (index >= 0) {
          acc[index] = {
            key,
            label: `${cur.year} - Q${cur.quarter}`,
            sum: acc[index].sum + cur.grade,
            count: acc[index].count + 1,
          };
        } else {
          acc.push({
            key,
            label: `${cur.year} - Q${cur.quarter}`,
            sum: cur.grade,
            count: 1,
          });
        }
        return acc;
      }, [])
      .map((x) => ({
        key: x.key,
        label: x.label,
        avg: (x.sum / x.count).toFixed(1),
      }));

    stats.sort((a, b) => (a.key > b.key ? 1 : -1));

    res.json({
      message: "Success",
      data: stats,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/api/statistics/period", async (req, res) => {
  try {
    const { year, quarter } = req.query;

    const grades = await Grades.findAll({
      where: { year, quarter },
      include: [Classes],
    });

    const stats = grades
      .reduce((acc, cur) => {
        const key = cur.classId;
        const index = acc.findIndex((x) => x.key === key);

        if (index >= 0) {
          acc[index] = {
            key,
            label: cur.class.name,
            sum: acc[index].sum + cur.grade,
            count: acc[index].count + 1,
          };
        } else {
          acc.push({
            key,
            label: cur.class.name,
            sum: cur.grade,
            count: 1,
          });
        }
        return acc;
      }, [])
      .map((x) => ({
        key: x.key,
        label: x.label,
        avg: (x.sum / x.count).toFixed(1),
      }));

    res.json({
      message: "Success",
      data: stats,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

export default router;
