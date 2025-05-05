// backend/middleware/validateFields.js

module.exports = (requiredFields = []) => {
  return (req, res, next) => {
    const missing = requiredFields.filter(field => !req.body[field]);
    if (missing.length > 0) {
      return res.status(400).json({
        error: `Faltan los siguientes campos obligatorios: ${missing.join(', ')}`
      });
    }
    next();
  };
};
