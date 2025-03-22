const jwt = require("jsonwebtoken");
const { findUserById } = require("../db/User");
const dotenv = require("dotenv");
dotenv.config();

const getIsTokenVerified = (token) => {
  try {
    const jwtTokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return jwtTokenVerified;
  } catch (error) {
    console.error("verify token error", error);
    return null;
  }
};

const AuthMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken?.startsWith("Bearer "))
      return res.status(400).json({ success: false, error: "token not found" });
    const tokenExtracted = bearerToken?.split(" ")[1];
    if (!tokenExtracted)
      return res
        .status(400)
        .json({ success: false, error: "Token not found after Bearer" });
    const jwtTokenVerified = getIsTokenVerified(tokenExtracted);

    if (!jwtTokenVerified)
      return res.status(400).json({
        success: false,
        error: "Invalid or expired token found",
      });

    const jwtTokenDecoded = jwt.decode(tokenExtracted);
    const userIdFromDecodedToken = jwtTokenDecoded?._id;

    if (!userIdFromDecodedToken)
      return res
        .status(401)
        .json({ success: false, error: "user id not found in token" });

    const userFound = await findUserById(userIdFromDecodedToken);
    if (!userFound)
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized user" });
    const userToken = userFound?._id;
    if (!userToken)
      return res.status(401).json({
        success: false,
        error: "Please login again to access this resource",
      });
    req.user = userFound;
    next();
  } catch (error) {
    console.error("auth middleware error", error);
    return res.status(400).json({
      success: false,
      error: "Something went wrong while authorizing user",
    });
  }
};
module.exports = { AuthMiddleware };
