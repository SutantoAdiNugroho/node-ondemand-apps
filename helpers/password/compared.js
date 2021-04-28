const bcrypt = require("bcrypt");

const comparedPassword = async (plainPassword, hashPassword) => {
  const compared = await bcrypt
    .compare(plainPassword, hashPassword)
    .then((result) => {
      return result;
    });

  return compared;
};

module.exports = comparedPassword;
