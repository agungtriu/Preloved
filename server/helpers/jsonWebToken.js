const jwt = require("jsonwebtoken");
const secretCode = process.env.SECRET_CODE || "ReactJS";

const tokenGenerator = (data) => {
  const { id, username, name } = data;
  return jwt.sign(
    {
      id,
      username,
      name,
    },
    secretCode
  );
};

const tokenVerifier = (data) => {
  return jwt.verify(data, secretCode);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
