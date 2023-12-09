import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  });
};

export default authenticate;
