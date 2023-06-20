import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressPino from 'express-pino-logger';
import logger from './utils/logger';
import { router } from './router';
import { db } from '@src/infra/db.config';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import apiSchema from './api-schema.json';

export class Server {
  public server: express.Application;

  constructor(private port = 3000) {
    this.server = express();
    this.middlewares();
    this.docSetup();
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

  private async docSetup(): Promise<void> {
    this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
    this.server.use(
      OpenApiValidator.middleware({
        apiSpec: apiSchema as OpenAPIV3.Document,
        validateRequests: true,
        validateResponses: true
      })
    )
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
