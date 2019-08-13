import Router from 'koa-router';
import validator from '../helpers/validator';
import authHelpers from '../helpers/auth';
import usersQueries from '../db/queries/users';

const router = new Router();

const PREFIX_URL = '/auth';
const REGISTER_URL = `${PREFIX_URL}/register`;

router.post(REGISTER_URL, validator.validate(validator.REGISTER_SCHEMA), async (ctx) => {
  try {
    const data = ctx.request.body;
    const hashPass = await authHelpers.getHashPass(data.password);
    data.password = hashPass;
    const [err] = await usersQueries.register(data);
    if (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'Error',
        message: err,
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        status: 'OK',
        message: 'Пользователь успешно зарегистирован!',
      };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 'Error',
      message: 'Внутренняя ошибка сервера.',
    };
  }
});

export default router;
