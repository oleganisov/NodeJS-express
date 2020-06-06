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
    email: Joi.string()
      .email()
      .required()
      .messages({ 'string.empty': 'Заполните e-mail' }),
    message: Joi.string().max(500).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validSkills = (req, res, next) => {
  const schema = Joi.object({
    age: Joi.number().min(1).max(100).required(),
    concerts: Joi.number().min(1).max(5000).required(),
    cities: Joi.number().min(1).max(200).required(),
    years: Joi.number().min(1).max(80).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validFile = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    size: Joi.number().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  next();
};

module.exports = { isAuth, validEmail, validSkills, validFile };
