import jwt from "jsonwebtoken";

/**
 * This function validates that the user token is valid
 * @returns 
 */
const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.send("acá")
    return res.redirect("/login");  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.send("acá 2")
    res.clearCookie("token");
    res.redirect("/login");
  }
};

export default cookieJwtAuth;
