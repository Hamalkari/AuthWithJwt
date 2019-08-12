import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(logger());
app.use(bodyParser());

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
