import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = path.join(__dirname, 'src', 'db');

const development = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING_DEV,
  migrations: {
    directory: path.join(BASE_URL, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_URL, 'seeds'),
  },
};

export {
  development,
};
