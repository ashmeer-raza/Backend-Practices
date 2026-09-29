import { readAccessToken } from "../utils/auth.utils.js";

export function authenticate(req, res, next) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access token not found in authorization header" });
  }

  try {
    const decoded = readAccessToken(accessToken);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid access token or expired" });
  }
}
