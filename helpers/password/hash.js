const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const hashResult = await bcrypt.hash(password, 10).then((hash) => {
    return hash;
  });

  return hashResult;
};

module.exports = hashPassword;
