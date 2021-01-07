import 'module-alias/register';
import 'tsconfig-paths/register';
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import v1 from 'v1';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(helmet());

app.use('/v1', v1);

app.get('/*', (_req, res) => {
  res.send(`Welcome to the Image Processing API!`);
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
}


export default app;
