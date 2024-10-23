const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  const token = req.cookies['token'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "jksdjfks", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("the user is authenticated");
    next();
  });
}

module.exports = authenticateToken;