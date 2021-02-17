const jwt = require("jsonwebtoken");
const fs = require("fs");

const authorization = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (authorization === undefined)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  const isBearer = req.headers["authorization"].split(" ")[0];
  const token = req.headers["authorization"].split(" ")[1];
  if (token === undefined)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  if (isBearer == "Bearer") {
    const privateKey = fs.readFileSync(__dirname + "/private.key");
    jwt.verify(token, privateKey, function (error, data) {
      if (error)
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      req.datauser = data;
      next();
    });

    /* --------------------- only On development ---------------------*/
  // } else if (isBearer == "Basic" && token == "BNP*1234") {
  //   next();
    /* ---------------------------------------------------------------*/

  } else {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = authorization;
