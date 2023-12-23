import createError from "http-errors";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwtUtils.js";
import RefreshTokenService from "../services/refreshToken.service.js";
import { RefreshToken } from "../models/RefreshTokenModel.js";
import { User } from "../models/UserModel.js";

const AuthController = {
  login: async(req, res, next) => {
    const { loginCredential, password, userRole } = req.body;

    let user = await User.findOne({
      $or: [
        { username: loginCredential },
        { email: loginCredential },
        { phone: loginCredential }
      ],
      password: password,
      userRole: userRole
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
}

export default AuthController;
 