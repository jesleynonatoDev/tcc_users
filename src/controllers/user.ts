import ApiError, { APIError } from '@src/utils/errors/api-error';
import { Response, Request } from 'express';
import logger from '@src/utils/logger';
import { UserModel } from '@src/models/user';

import * as mock from '@src/mock/users.json'

export class UserController {
    public async create(req: Request, res: Response): Promise<void> {
      const { userName, email, firstName, lastName } = req.body
      try {
        const user = await UserModel.create({
          userName: userName,
          email: email,
          firstName: firstName,
          lastName: lastName,
        });
      res.status(200).send(user);
    } catch (err) {
      logger.error(JSON.stringify(err));
      res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
  }
  public async list(req: Request, res: Response): Promise<Response> {
    const user = await UserModel.find(req.body, req.body, { skip: 10, limit: 25});
    if (!user) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
    return res.status(200).send({ user });
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const userSearchById = req.body;
    try {
      const userFinded = await UserModel.findById(userSearchById).exec();
      return res.status(200).send({ userFinded });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
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
