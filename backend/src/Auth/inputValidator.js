
const z = require("zod");

exports.userSignupInputValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req.check('email', 'Email must be between 3 to 32 characters')
      .matches(/.+\@.+\..+/)
      .withMessage('Email must contain @')
      .isLength({
          min: 4,
          max: 32
      });
  req.check('password', 'Password is required').notEmpty();
  req.check('password')
      .isLength({ min: 6 })
      .withMessage('Password must contain at least 6 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number');
  const errors = req.validationErrors();
  if (errors) {
      const firstError = errors.map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
  }
  next();
};

exports.validate = (schema) =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error.message);
    }
};

exports.register = z.object({
  body: z.object({

    name: z.string(),

    email: z.string().nonempty('This is required').email({ message: 'Must be a valid email' }),

    password: z.string().nonempty('This is required').min(8, { message: 'Too short' }),
  }),
});