import bcrypt from 'bcrypt';


const getHashPass = async (password) => {
  const salt = await bcrypt.genSalt(Number((process.env.SALT_ROUNDS)));
  const hashPass = await bcrypt.hash(password, salt);
  return hashPass;
};

const comparePassword = async (password, hashPassword) => {
  const isEqual = await bcrypt.compare(password, hashPassword);
  return isEqual;
};


export default {
  getHashPass,
  comparePassword,
};
