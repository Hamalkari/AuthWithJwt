import Router from 'koa-router';
import validator from '../helpers/validator';
import authHelper from '../helpers/auth';
import usersQueries from '../db/queries/users';

const router = new Router();

const PREFIX_URL = '/auth';
const REGISTER_URL = `${PREFIX_URL}/register`;
const LOGIN_URL = `${PREFIX_URL}/login`;
const REFRESH_TOKEN_URL = `${PREFIX_URL}/refresh-token`;

router.post(REGISTER_URL, validator.validate(validator.REGISTER_SCHEMA), async (ctx) => {
  try {
    const data = ctx.request.body;
    const hashPass = await authHelper.getHashPass(data.password);
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

router.post(LOGIN_URL,
  validator.validate(validator.LOGIN_SCHEMA),
  async (ctx) => {
    try {
      const data = ctx.request.body;
      const [user] = await usersQueries.getOneUser({ email: data.email });
      if (!user) {
        ctx.status = 401;
        ctx.body = {
          status: 'Error',
          message: 'Неправильные логин или пароль!',
        };
      }
      const isEqualPasswords = await authHelper.comparePassword(data.password, user.password);
      if (isEqualPasswords) {
        const { accessToken, refreshToken } = await authHelper.updateTokens(user.id);
        await usersQueries.updateUser({ id: user.id }, { refresh_token: refreshToken });
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          message: 'Пользователь залогинен',
          accessToken,
          refreshToken,
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          status: 'Error',
          message: 'Неправильные логин или пароль!',
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        status: 'Error',
        message: 'Внутреняя ошибка сервера',
      };
    }
  });

router.post(REFRESH_TOKEN_URL,
  validator.validate(validator.REFRESH_TOKEN_SCHEMA),
  async (ctx) => {
    try {
      const data = ctx.request.body;
      const id = await authHelper.getIdFromRefreshToken(data.refreshToken);
      const [user] = await usersQueries.getOneUser({ id });
      const userRefreshToken = user.refresh_token;
      if (userRefreshToken === data.refreshToken) {
        // update refresh_token and access_token and update refresh_token in database
        const { accessToken, refreshToken } = await authHelper.updateTokens(id);
        await usersQueries.updateUser({ id }, { refresh_token: refreshToken });
        ctx.status = 200;
        ctx.body = {
          status: 'OK',
          message: 'Токены успешно обновлены',
          accessToken,
          refreshToken,
        };
      } else {
        ctx.status = 401;
        ctx.body = {
          status: 'OK',
          message: 'Инвалидный refresh_token',
        };
      }
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        status: 'Error',
        message: error.message,
      };
    }
  });


router.get('/auth/test',
  authHelper.authMiddleware,
  async (ctx) => {
    console.log(ctx.state.user);

    ctx.status = 200;
    ctx.body = {
      status: 'OK',
      message: 'Тест успешно прошел',
      user: ctx.state.user,
    };
  });

export default router;
