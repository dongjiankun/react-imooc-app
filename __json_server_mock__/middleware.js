module.exports = function (req, res, next) {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "admin" && req.body.password === "admin") {
      return res.status(200).json({
        user: {
          token: "1234567890",
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  }
  next();
};
