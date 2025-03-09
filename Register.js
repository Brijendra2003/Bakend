function register(bcrypt, app, db) {
  app.post("/register", async (req, res) => {
    const isAddUser = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(DISTINCT username) AS users FROM admin",
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result[0].users < 2); // Returns true if less than 2 users
        }
      );
    });

    if (isAddUser) {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO admin (username, password) VALUES (?, ?)";
      db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
          // console.log(err.message);
          // console.log(hashedPassword);

          if (err.message.startsWith("Duplicate"))
            err.message = "You were Already Registered";

          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Registeretion successfully" });
      });
    } else {
      res.json({
        message:
          "Thank you for your interest. Unfortunately, we have reached the limit for new users and cannot add you at this time.",
      });
    }
  });
}

module.exports = register;
