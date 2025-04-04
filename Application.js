function Application(app, db) {
  app.get("/StudentLogin", (req, res) => {
    let query =
      "SELECT branch, semester, division, batch FROM timetable GROUP BY branch, semester, division, batch";
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  });

  //
  //
  app.get("/Lecturer", (req, res) => {
    let query = `SELECT name FROM teachers where teacher_id = ${req.query.id}`;
    // console.log(req.query.id);
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      } else if (result.length === 0) {
        return res.status(404).json({ message: "No data found!" }); // ✅ Use return
      }
      res.json(result);
    });
  });

  app.get("/studentTT", (req, res) => {
    // console.log(req.query);
    const { branch, semester, division, batch } = req.query;

    const query = `SELECT t.day, t.lecture_time, s.subject_name, te.name AS teacher_name,t.batch FROM timetable t JOIN subjects s ON t.subject_id = s.subject_id JOIN teachers te ON t.teacher_id = te.teacher_id WHERE t.branch = '${branch}' AND t.semester = ${semester} AND t.division = '${division}' AND (t.batch = '${batch}' OR t.batch = 'All')`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      } else if (result.length === 0) {
        return res.status(404).json({ message: "No data found!" }); // ✅ Use return
      }
      // console.log(result);

      res.json(result);
    });
  });
  //
  //
  //
  app.get("/lecturerTT", (req, res) => {
    console.log(req.query);
    const { Id } = req.query;
    const query = `select t.branch, t.semester, t.division, t.batch, t.day, t.lecture_time, s.subject_name from timetable t JOIN subjects s ON t.subject_id = s.subject_id where t.teacher_id = ${Id} `;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      } else if (result.length === 0) {
        return res.status(404).json({ message: "No data found!" }); // ✅ Use return
      }
      // console.log(result);
      res.json(result);
    });
  });
}

module.exports = Application;
