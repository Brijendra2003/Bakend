function timeTable(app, db, verifyToken) {
  app.get("/timetable", verifyToken, (req, res) => {
    let query = "select * from timetable";
    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  });

  app.post("/timetable:id", verifyToken, (req, res) => {
    let id = req.params.id;
    let data = req.body;

    let query = `update timetable set branch = '${data.branch}', semester = ${data.semester}, division = '${data.div}', batch = '${data.batch}', day = '${data.day}', lecture_time = '${data.lecTime}',subject_id = ${data.subId}, teacher_id = ${data.teachId} where id = ${id}`;

    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.send("Successfully Updated!");
    });
  });

  app.delete("/timetable:id", verifyToken, (req, res) => {
    let id = req.params.id;
    let query = `delete from timetable where id = ${id}`;

    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.send("Successfully Deleted!");
    });
  });
}

module.exports = timeTable;
