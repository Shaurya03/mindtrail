import jwt from "jsonwebtoken";
import { parseCookie } from "cookie";

function verifyAuth(req) {

  const header = req.headers.cookie;

  if (!header) {
    return { valid: false };
  }

  const parse = parseCookie(header);

  const token = parse.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return { valid: true, userId: decoded.id };

  } catch (error) {
    return { valid: false };
  }

};

export default verifyAuth;