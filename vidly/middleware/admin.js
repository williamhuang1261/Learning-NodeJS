module.exports = function (req, res, next) {
  //401 Unauthorized, not the good token
  //403 Forbidden, valid token, but unaccessible

  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  next();
}