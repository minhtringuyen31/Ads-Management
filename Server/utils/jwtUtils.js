import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const userPayload = {
    userId: '123',
    username: 'exampleUser',
    role: 'admin',
  };

export const generateAccessToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, secretKey, { expiresIn: '15m' });
};

export const generateRefreshToken = () => {
  return jwt.sign({ userId, username, role }, secretKey, { expiresIn: '7d' });
};
