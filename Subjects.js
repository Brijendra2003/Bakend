function subjects(app, db, verifyToken) {
  app.get("/subjects", verifyToken, (req, res) => {
    let query = "Select * from subjects";
    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      // console.log(result);
      res.json(result);
    });
  });

  app.post("/subjects:id", verifyToken, (req, res) => {
    // console.log(req.body);
    let data = req.body;
    let query = `update subjects set subject_id = ${data.sid}, subject_name = '${data.sname}', teacher_id = ${data.teid}, branch = '${data.branch}' where subject_id = ${req.params.id}`;

    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      // console.log(result);
      res.send("Successfully Updated!");
    });
  });

  app.put("/subjects", verifyToken, (req, res) => {
    let data = req.body;
    let query = `insert into subjects values(${data.sid}, '${data.sname}', ${data.teid},'${data.branch}')`;
    db.query(query, (err, result) => {
      if (err) {
        console.log("error", err);
        return res.status(500).json({ error: err.message });
      }
      res.send("Succesfully Added a new Row!");
    });
  });
}

module.exports = subjects;
