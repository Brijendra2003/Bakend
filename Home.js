function Home(app, db, verifyToken) {
  app.get("/home", verifyToken, (req, res) => {
    let query =
      "SELECT (SELECT COUNT(*) FROM teachers) AS teacher, (SELECT COUNT(*) FROM subjects) AS subject, (SELECT COUNT(*) FROM timetable) AS timetable;";
    db.query(query, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      // console.log(result[0]);
      res.json(result[0]);
    });
  });

  app.post("/home", verifyToken, (req, res) => {
    let values = req.body.sendData;
    // console.log(req.body.sendData);
    let table = req.body.tablename;
    let query = `insert into ${table} values ?`;
    if (table == "timetable") {
      query = `insert into ${table} (branch, semester, division, batch, day, lecture_time, subject_id, teacher_id) values ?`;
    }
    db.query(query, [values], (err, result) => {
      if (err) {
        console.log(err);
        // console.log(result);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: `Your ${table} data is stored Succefully!` });
    });
  });
}

module.exports = Home;
