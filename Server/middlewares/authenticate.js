import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {

  const authorizationClient = req.headers['authorization'];
  console.log(authorizationClient);
  const token = authorizationClient && authorizationClient.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token.toString(), secretKey, async (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorizeds" });
    }

    req.user = user;
    next();
  });
};

export default authenticate;
