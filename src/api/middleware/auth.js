// const jwt = require("jsonwebtoken");
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');

const config = process.env;

const auth = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "A token is required for authentication"
    });
  }
  try {
    // const decoded = jwt.verify(token, config.TOKEN_KEY);
    // const { uid } = jwt.decode(token);
    // console.log(decoded)
    // req.user = {
    //   ...decoded
    // };
    const firebaseDecode = await admin.auth().verifyIdToken(token);

    console.log('firebaseDecode', firebaseDecode)
    req.user = {
      token,
      ...firebaseDecode
    }
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Invalid Token"
    });
  }
  return next();
};

module.exports = auth;