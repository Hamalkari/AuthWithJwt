# AuthWithJwt
Simple spa with jwt authorization. Frontend - Vue, quasar. Backend - Koa. Database - Postgresql.

## How to start
### For server side
1. cd server/
2. npm install
3. npm install -g nodemon knex , if you are not have global nodemon and knex
4. create database with your name and your user in postgresql
5. add posgresql uri in file server/example.env
6. add any secret_key in file server/example.env
7. rename exapmle.env on .env
8. npm run knex:migrate
9. npm run dev
### For client side
1. cd client/
2. npm install
3. npm install -g @quasar/cli, if you are not have global quasar on your computer
4. quasar dev
