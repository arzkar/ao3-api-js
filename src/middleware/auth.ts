import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const config = process.env;

export default function verifyToken(req, res, next){
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      err: "A token is required for authentication",
    });
  }
  try {
    const decoded = verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      err: "Invalid Token",
    });
  }
  return next();
};