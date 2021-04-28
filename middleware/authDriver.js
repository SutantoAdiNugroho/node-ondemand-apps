const { DriverModel } = require("../models");

const config = require("../config");
const jwt = require("jsonwebtoken");

let objErr = {};

module.exports = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["bearer"];
    const decodedToken = jwt.verify(tokenHeader, config.JWT_SECRET_KEY);
    const findDriverToken = await DriverModel.findOne({ token: tokenHeader });

    if (!findDriverToken || findDriverToken.token != tokenHeader) {
      objErr.status = 401;
      objErr.message = "Token is not match with any drivers";
      return handleError(req, res, objErr);
    }

    if (findDriverToken.role != "driver") {
      objErr.status = 401;
      objErr.message = "This endpoint just can be used for drivers";
      return handleError(req, res, objErr);
    }

    return next();
  } catch (error) {
    console.error("Error occured with message :", error);

    let errorMsg = error.message;
    if (errorMsg === "jwt must be provided") {
      objErr.status = 403;
      objErr.message =
        "Driver's token is mandatory, please insert the token first";
    } else if (error.message === "invalid signature") {
      objErr.status = 400;
      objErr.message = "Please insert a correct jwt token";
    } else {
      objErr.status = 500;
      objErr.message = error.message;
    }

    return handleError(req, res, objErr);
  }
};

const handleError = (req, res, objErr) => {
  let timestamp = new Date();

  res
    .status(objErr.status)
    .json({
      timestamp: timestamp,
      status: objErr.status,
      message: objErr.message,
      path: req.originalUrl,
    })
    .end();
};
