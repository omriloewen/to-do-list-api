const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized: No credentials provides");
  }

  const validUsername = "admin";
  const validPassword = "password";

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (username === validUsername && password === validPassword) {
    next();
  } else {
    res.status(401).send("Unauthorized: Invalid credentials");
  }
};

module.exports = authenticate;
