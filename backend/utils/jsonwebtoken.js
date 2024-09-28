const jwt = require("jsonwebtoken");

exports.createJsonWebToken = (payload, expiresTime) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be a non-empty object");
  }

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: expiresTime,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
