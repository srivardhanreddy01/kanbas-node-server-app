import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const course = await dao.findCourseById(id);
      if (!course) {
        res.status(404).send("Course not found");
        return;
      }
      res.send(course);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/api/courses/:id", async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
      const status = await dao.deleteCourse(id);
      res.json(204);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;
    try {
      const status = await dao.updateCourse(id, course);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.send(courses);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post("/api/courses", async (req, res) => {
    console.log(req.body);
    const course = await dao.createCourse(req.body);
    console.log(course);
    res.send(course);
  });
}
