import Koa from 'koa';
import logger from 'koa-logger';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';

import authRoutes from './routes/auth';

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());

// Routes
app.use(authRoutes.routes());

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
