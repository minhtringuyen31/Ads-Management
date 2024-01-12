import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;


export const generateAccessToken = (userId, fullname, userRole) => {
  return jwt.sign({ userId, fullname, userRole }, secretKey, { expiresIn: '5m' });
};

export const generateRefreshToken = (userId, fullname, userRole) => {
  const expiresIn = '30d'; 

  const payload = {
    userId,
    fullname,
    userRole,
  };

  const refreshToken = jwt.sign(payload, secretKey, { expiresIn });

  const decodedToken = jwt.decode(refreshToken);
  const expireDate = new Date(decodedToken.exp * 1000);

  return { refreshToken, expireDate };
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw err;
  }
};
