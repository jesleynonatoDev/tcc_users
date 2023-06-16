import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressPino from 'express-pino-logger';
import logger from './utils/logger';
import { router } from './router';
import { db } from '@src/infra/db.config';

export class Server {
  public server: express.Application;

  constructor(private port = 3000) {
    this.server = express();
    this.middlewares();
    this.router();
    db.init();
  }

  private middlewares(): void {
    this.server.use(bodyParser.json());
    this.server.use(
      expressPino({
        logger,
      })
    );
    this.server.use(
      cors({
        origin: '*',
      })
    );
  }



  private router(): void {
    this.server.use(router);
  }

  public start(): void {
    this.server.listen(this.port, () => {
      logger.info('Server listening on port: ' + this.port);
    });
  }
}
