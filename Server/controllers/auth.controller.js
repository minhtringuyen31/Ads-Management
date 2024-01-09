import createError from "http-errors";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwtUtils.js";
import RefreshTokenService from "../services/refreshToken.service.js";
import { RefreshToken } from "../models/RefreshTokenModel.js";
import { User } from "../models/UserModel.js";
import otpGenerator from "otp-generator";
import redis, {get, set} from "../configs/redis.js"
import UserService from "../services/user.service.js";
import nodemailer from "nodemailer";
import rabbitmq from "../message-broker/rabbitmq.js";
const AuthController = {
  login: async(req, res, next) => {
    const { loginCredential, password } = req.body;
    let user = await User.findOne({
      $or: [
        { email: loginCredential },
        { phone: loginCredential }
      ],
      password: password,
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    
    const accessToken = generateAccessToken(user._id, user.fullname, user.userRole);
    const { refreshToken, expireDate } = generateRefreshToken(user._id, user.fullname, user.userRole);

    RefreshTokenService.create({
      token: refreshToken,
      userId: user._id,
      expireDate: expireDate,
    });
    
    user.password = undefined;
    req.user = user;
    console.log(req.user)
    res.json({ user, accessToken, refreshToken });
  },
  refresh: async (req, res) => {
    const { refreshToken } = req.body;
    console.log(refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const storedRefreshToken = await RefreshToken.findOne({ token: refreshToken });

      if (!storedRefreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        const user = await verifyToken(refreshToken);
        
        if (user.userId.toString() === storedRefreshToken.userId.toString()) {
          const accessToken = generateAccessToken(user.userId, user.fullname, user.userRole);
          const { refreshToken, expireDate } = generateRefreshToken(user.userId, user.fullname, user.userRole);
          RefreshTokenService.create({
            token: refreshToken,
            userId: user.userId,
            expireDate: expireDate,
          });
  
          res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  forgot: async(req, res, next) => {
    try {
      const { email } = req.body;
      const user = UserService.getByEmail(email);
      if(!user){
        return res.status(404).json({message: "Email not found!"});
      }
      const otp = otpGenerator.generate(6, {digits: true, upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
      await set(email, otp, 60);
      //ok
    }
    catch(error){
      return res.status(500).json({message: "Internal Server Error"});
    }
    
    
    
  },
}

export default AuthController;
 