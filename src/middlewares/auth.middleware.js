import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
}

export async function IsAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "not authorized" });
  if (req.user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "not authorized, must be an admin" });
  }
  next();
}
