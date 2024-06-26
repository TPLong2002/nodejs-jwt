import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
const nonSecurePaths = [
  "/login",
  "/logout",
  "/test",
  "/register",
  "/forgot-password",
  "/reset-password",
];
const createToken = (data) => {
  let token = "";
  try {
    token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {}
  return token;
};
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return null;
    }
    return decoded;
  });
};
function extractToken(req) {
  if (req) {
    return req.split(" ")[1];
  } else {
    return null;
  }
}
const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) {
    return next();
  }
  const token =
    req.cookies.token ||
    req.headers["x-access-token"] ||
    extractToken(req.headers["authorization"]) ||
    req.headers["token"] ||
    req.query.token ||
    req.body.token ||
    req.params.token;
  if (!token) {
    console.log("No token provided!", req.path);
    return res.status(200).json({
      message: "No token provided!",
      code: 1,
      data: { isAuth: false },
    });
  }
  const decoded = verifyToken(token);
  if (decoded) {
    req.user = decoded;
    req.token = token;
    next();
  } else {
    return res
      .status(401)
      .send({ message: "Unauthorized!", code: 1, data: [] });
  }
  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res
  //       .status(401)
  //       .send({ message: "Unauthorized!", code: 1, data: [] });
  //   }
  //   req.user = decoded;
  //   console.log("decoded", decoded);
  //   next();
  // });
};
const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path == "/user/account") {
    return next();
  }
  if (req.user) {
    let email = req.user.email;
    let roles = req.user.roles[0].Roles;

    let currentUrl = req.path;
    // console.log("roles", roles);
    // console.log("currentUrl", currentUrl);
    if (roles.length > 0) {
      let checkPermission = roles.filter((item) => {
        return item.url === currentUrl;
      });
      if (checkPermission.length > 0) {
        next();
      } else {
        return res
          .status(401)
          .send({ message: "you don't have permission", code: 1, data: [] });
      }
    } else {
      return res
        .status(401)
        .send({ message: "you don't have permission", code: 1, data: [] });
    }
  } else {
    return res
      .status(401)
      .send({ message: "Unauthorizede!", code: 1, data: [] });
  }
};
module.exports = {
  createToken,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
};
