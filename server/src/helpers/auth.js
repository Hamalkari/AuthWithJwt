import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userQueries from '../db/queries/users';

const getHashPass = async (password) => {
  const salt = await bcrypt.genSalt(Number((process.env.SALT_ROUNDS)));
  const hashPass = await bcrypt.hash(password, salt);
  return hashPass;
};

const comparePassword = async (password, hashPassword) => {
  const isEqual = await bcrypt.compare(password, hashPassword);
  return isEqual;
};

const updateTokens = async (id) => {
  const accessToken = await jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = await jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' });
  return {
    accessToken,
    refreshToken,
  };
};

const getIdFromRefreshToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    return decoded.id;
  } catch (error) {
    throw new Error(error.name);
  }
};

const authMiddleware = async (ctx, next) => {
  const token = ctx.headers.authorization.split(' ')[1];
  try {
    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    ctx.state.user = await userQueries.getOneUser({ id: payload.id });
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      status: 'Error',
      message: error.message,
    };
  }
  return next();
};


export default {
  getHashPass,
  comparePassword,
  updateTokens,
  getIdFromRefreshToken,
  authMiddleware,
};
