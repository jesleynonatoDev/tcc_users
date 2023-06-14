import ApiError, { APIError } from '@src/utils/errors/api-error';
import { Response, Request } from 'express';
import logger from '@src/utils/logger';

import * as mock from '@src/mock/users.json'

export class UserController {
    public async create(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await req.body
      res.status(200).send(newUser);
    } catch (err) {
      logger.error(JSON.stringify(err));
      res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
  }
  public async list(req: Request, res: Response): Promise<Response> {
    const user = await mock;
    if (!user) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
    return res.status(200).send({ user });
  }

  public findById(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }

  public async me(req: Request, res: Response): Promise<Response> {
    const userId = req.body?.userId;

    if (!userId) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
    const user = await mock;
    if (!user) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
    return res.send({ user });
  }


}
