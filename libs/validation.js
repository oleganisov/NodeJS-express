const Joi = require('@hapi/joi');

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/login');
  }
};

const validEmail = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(100).required(),
    email: Joi.string().email().required(),
    message: Joi.string().max(500).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { isAuth, validEmail };
