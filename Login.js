function login(bcrypt, jwt, app, db) {
  const SECRET_KEY = "Raunak"; // Store securely in .env
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query(
      "SELECT * FROM admin WHERE username = ?",
      [username],
      async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0)
          return res.status(401).json({ error: "User not found" });

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
          { id: user.id, username: user.username },
          SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        res
          .cookie("token", token, { httpOnly: true, secure: false })
          .json({ message: "Login successful", token });
      }
    );
  });
}

module.exports = login;
