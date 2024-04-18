import Database from "../Database/index.js";
export default function AssignmentsRoutes(app) {

    app.get("/api/assignments/:course_id/assignments", (req, res) => {
        // console.log()
        const { course_id } = req.params;
        const assignment_list = Database.assignments
        .filter((a) => a.course === course_id);
        res.send(assignment_list);
    });
      

    app.post("/api/assignments/:course_id/assignments", (req, res) => {
      const { course_id } = req.params;
      
      const newassignment = {
          ...req.body,
          course: course_id,
          _id: new Date().getTime().toString(),
      };
      Database.assignments.push(newassignment);
      res.send(newassignment);
      });


      app.put("/api/assignments/:assignment_id", (req, res) => {
        const { assignment_id } = req.params;
        console.log(req.body)
        // Database.assignments = Database.assignments
        //   .filter((c) => c._id == assignment_id ?{...c,...req.body }:c);
          

          const assignmentIndex = Database.assignments.findIndex(
            (m) => m._id === assignment_id);
            Database.assignments[assignmentIndex] = {
            ...Database.assignments[assignmentIndex],
            ...req.body
          };

        // Database.assignments.push(newassignment);
        res.sendStatus(204);
        });


      app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        Database.assignments = Database.assignments
          .filter((c) => c._id !== id);
        res.sendStatus(204);
      });


    app.get("/api/assignments", (req, res) => {
        const assignments = Database.assignments;
        console.log(assignments)
        res.send(assignments);
      });
}