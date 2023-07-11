import jwt from "jsonwebtoken";

/**
 * This function validates that the user token is valid
 * @returns
 */
const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies[process.env.COOKIE];
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const decoded = jwt.verify(token, process.env.AUTH);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie(process.env.COOKIE);
    res.redirect("/login");
  }
};

export default cookieJwtAuth;
