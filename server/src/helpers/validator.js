import Joi from '@hapi/joi';


const validate = (schema) => (ctx, next) => {
  const res = schema.validate(ctx.request.body);
  if (res.error !== null) {
    ctx.status = 400;
    ctx.body = {
      status: 'Error',
      message: 'Введены некорректные данные',
    };
    return;
  }
  return next(); // eslint-disable-line
};

const LOGIN_SCHEMA = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const REGISTER_SCHEMA = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  second_name: Joi.string().required(),
  phone_number: Joi.string().regex(/\d+$/).length(11),
});

export default {
  validate,
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
};
