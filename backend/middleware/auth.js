const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  // if token is not present
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
  // verify the token
  try {
    // remove the Bearer from the token
    const token = req.headers.authorization.replace("Bearer ", "");
    // verify the token and get the user id
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decodedToken.id,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
