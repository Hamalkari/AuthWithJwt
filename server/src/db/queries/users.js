import knex from '../connection';


function register(data) {
  return knex('users')
    .insert(data)
    .returning('*')
    .then((res) => [null, res])
    .catch((err) => {
      let message = '';
      if (err.constraint === 'users_email_unique') {
        message = 'Пользователь с таким ящиком уже существует';
      } else if (err.constraint === 'users_phone_number_unique') {
        message = 'Пользователь с таким номером телефона уже существует';
      }
      return [message];
    });
}

function getOneUser(data) {
  return knex('users')
    .where(data)
    .returning('*');
}

function updateUser(opts, data) {
  return knex('users')
    .where(opts)
    .update(data);
}

export default {
  register,
  getOneUser,
  updateUser,
};
