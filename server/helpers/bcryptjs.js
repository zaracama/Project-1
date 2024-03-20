const bcryptjs = require("bcryptjs");

function encodePassword(instance) {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(instance.password, salt);
  return hash;
}

function comparePassword(password, hash) {
  return bcryptjs.compareSync(password, hash);
}

module.exports = {
  encodePassword,
  comparePassword,
};