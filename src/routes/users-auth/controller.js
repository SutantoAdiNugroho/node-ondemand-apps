const { UserModel, DriverModel } = require("../../../models");
const {
  hashPassword,
  comparedPassword,
  generateToken,
} = require("../../../helpers");

let objErr = {};

module.exports = {
  userRegister: async (req, res) => {
    const hasPass = await hashPassword(req.body.password);
    const genToken = await generateToken(req.body);

    try {
      //Check if email already used
      const userCheckEmail = await UserModel.findOne({ email: req.body.email });

      if (userCheckEmail) {
        objErr = clearObjErr(objErr);
        objErr.status = 400;
        objErr.message = `User with email ${req.body.email} already used, please register with another email`;
        return handleError(req, res, objErr);
      }

      //Continue registration process
      const userRegistration = await UserModel.create({
        ...req.body,
        password: hasPass,
        token: genToken,
      });

      const { _id, name, email } = userRegistration;

      res.status(201).json({
        status: 201,
        message: `User successfully created with id ${userRegistration._id}`,
        data: { _id, name, email },
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr = clearObjErr(objErr);
      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  driverRegister: async (req, res) => {
    const hasPass = await hashPassword(req.body.password);
    const genToken = await generateToken(req.body);

    try {
      //Check if email already used
      const userCheckEmail = await DriverModel.findOne({
        email: req.body.email,
      });

      if (userCheckEmail) {
        objErr = clearObjErr(objErr);
        objErr.status = 400;
        objErr.message = `Driver with email ${req.body.email} already used, please register with another email`;
        return handleError(req, res, objErr);
      }

      //Continue registration process
      const driverRegistration = await DriverModel.create({
        ...req.body,
        password: hasPass,
        token: genToken,
      });

      const { _id, name, email } = driverRegistration;

      res.status(201).json({
        status: 201,
        message: `Driver successfully created with id ${driverRegistration._id}`,
        data: { _id, name, email },
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr = clearObjErr(objErr);
      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  userLogin: async (req, res) => {
    try {
      await UserModel.findOne({
        email: req.body.email,
      }).then(async (user) => {
        if (!user) {
          objErr = clearObjErr(objErr);
          objErr.status = 404;
          objErr.message = `User with email ${req.body.email} not found`;
          return handleError(req, res, objErr);
        }

        const comparePass = await comparedPassword(
          req.body.password,
          user.password
        );

        if (!comparePass) {
          objErr = clearObjErr(objErr);
          objErr.status = 401;
          objErr.message = "The password that entered was incorrect";
          return handleError(req, res, objErr);
        }

        //Successfully validation
        const { name, email, token } = user;

        return res.status(200).json({
          status: 200,
          message: "Login succesfully",
          data: { name, email, token },
        });
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr = clearObjErr(objErr);
      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
  driverLogin: async (req, res) => {
    try {
      await DriverModel.findOne({
        email: req.body.email,
      }).then(async (user) => {
        if (!user) {
          objErr = clearObjErr(objErr);
          objErr.status = 404;
          objErr.message = `Driver with email ${req.body.email} not found`;
          return handleError(req, res, objErr);
        }

        const comparePass = await comparedPassword(
          req.body.password,
          user.password
        );

        if (!comparePass) {
          objErr = clearObjErr(objErr);
          objErr.status = 401;
          objErr.message = "The password that entered was incorrect";
          return handleError(req, res, objErr);
        }

        //Successfully validation
        const { name, email, token } = user;

        return res.status(200).json({
          status: 200,
          message: "Login succesfully",
          data: { name, email, token },
        });
      });
    } catch (error) {
      console.error("Error occured with message :", error);

      objErr = clearObjErr(objErr);
      objErr.status = 500;
      objErr.message = error.message;
      return handleError(req, res, objErr);
    }
  },
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

const clearObjErr = (objErr) => {
  for (var member in objErr) delete objErr[member];

  return objErr;
};
