const AppError = require("../utils/AppError");

function adminValidation(req, res, next) {
  if (!req.user.isAdmin) {
    throw new AppError(
      "O usuário não tem autorização para acessar este recurso.",
      401
    );
  }
  return next();
}

module.exports = adminValidation;
