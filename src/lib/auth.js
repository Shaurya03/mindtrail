import jwt from "jsonwebtoken";

function verifyAuth(req) {

  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return { valid: false };
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return { valid: true, userId: decoded.id };

  } catch (error) {
    return { valid: false };
  }

};

export default verifyAuth;