
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        {
          email: 'kosha@mail.ru',
          phone_number: '89299271685',
          password: '12343',
          first_name: 'Коша',
          second_name: 'Иванов',
        },
        {
          email: 'user2@email.com',
          phone_number: '88005552352',
          password: 'password',
          first_name: 'Владимир',
          second_name: 'Чуриков',
        },
        {
          email: 'user3@email.com',
          phone_number: '89333333333',
          password: 'password',
          first_name: 'Павел',
          second_name: 'Цыпиков',
        },
      ]));
};
