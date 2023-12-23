import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  let token = req.headers.authorization;


  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  token = token.toString();

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  });
};

export default authenticate;
