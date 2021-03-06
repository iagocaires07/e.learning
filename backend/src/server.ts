import express from 'express';

import './database/index';
import routes from './routes';

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3333, () => {
  console.log('Server Started!');
});
