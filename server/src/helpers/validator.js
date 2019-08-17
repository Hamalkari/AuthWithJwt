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

const REGISTER_SCHEMA = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  second_name: Joi.string().required(),
  phone_number: Joi.string().regex(/\d+$/).length(11),
});

const LOGIN_SCHEMA = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const REFRESH_TOKEN_SCHEMA = Joi.object().keys({
  refreshToken: Joi.string().required(),
});

export default {
  validate,
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
  REFRESH_TOKEN_SCHEMA,
};
