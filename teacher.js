function teacher(app, db, verifyToken) {
  app.get("/teachers", verifyToken, (req, res) => {
    let query = `select * from teachers`;
    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  });

  app.post("/teachers", verifyToken, (req, res) => {
    let { teacherName, tData } = req.body;
    // console.log(teacherName, dpt, tData);
    let query = `update teachers set teacher_id = ${tData.tid}, name = '${tData.tname}', department = '${tData.tdept}' where name = '${teacherName}'`;
    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.send("Succesfully updated!");
    });
  });

  app.delete("/teachers", verifyToken, (req, res) => {
    // console.log(req.query);
    let query = `delete from teachers where teacher_id = '${req.query.teacherId}'`;
    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.send("Successfully deleted!");
    });
  });

  app.put("/teachers", verifyToken, (req, res) => {
    let data = req.body;
    let query = `insert into teachers values(${data.tid}, '${data.tname}', '${data.tdept}')`;
    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.send("Succesfully Added a new Row!");
    });
  });
}

module.exports = teacher;
