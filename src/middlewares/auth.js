const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

function check(roles = []) {
  return async function (req, res, next) {
    if (typeof roles === "string") {
      roles = [roles];
    }

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(res.status(401).json({ error: "Please Login Again" }));
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const currentUser = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });
      if (!currentUser || (roles.length && !roles.includes(currentUser.role))) {
        return next(res.status(401).json({ error: "User is not authorized" }));
      }

      req.user = currentUser;
      res.locals.user = currentUser;
      next();
    } catch (err) {
      return next(res.status(401).json({ error: "User is not authorized" }));
    }
  };
}

exports.protected = { check };
