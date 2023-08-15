const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid Token or User is not authorized to access");
      }
    //   console.log(decoded);
      req.user = decoded.user;
      next();
    });
    if(!token) {
      res.status(401);
      throw new Error("Invalid Token or User is not authorized to access");
    }
  }
});


module.exports = validateToken;