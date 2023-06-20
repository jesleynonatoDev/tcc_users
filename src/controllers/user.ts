import ApiError from '@src/utils/errors/api-error';
import { Response, Request } from 'express';
import logger from '@src/utils/logger';

import * as mock from '@src/mock/users.json';
import { UserService } from '@src/services/userService';
import { UserInterface } from '@src/interfaces/userInterface';

export class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const createdUser = await UserService.addUser(req.body);
      res.status(201).send(createdUser);
    } catch (err) {
      logger.error(JSON.stringify(err));
      res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
  }
  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const listAllUsers = await UserService.getAll();
      if (!listAllUsers) {
        return res
          .status(400)
          .send(ApiError.format({ code: 400, message: 'Not finded users!' }));
      }
      return res.status(200).send({ listAllUsers });
    } catch (err) {
      logger.error('Something went wrong');
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const userSearchedById = req.params.id;
    try {
      const userFinded = await UserService.getUserById(userSearchedById);
      return res.status(200).send({ userFinded });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res
        .status(404)
        .send(ApiError.format({ code: 404, message: 'Something went wrong!' }));
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id;

    try {
      const user: Partial<UserInterface> = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
      const updateUser = await UserService.update(userId, user);
      if (updateUser.modifiedCount === 0) {
        return res
          .status(400)
          .send(ApiError.format({ code: 400, message: 'Not updated users!' }));
      }
      return res.status(200).send({ updateUser });
    } catch (err) {
      logger.error(JSON.stringify(err));
      return res
        .status(500)
        .send(ApiError.format({ code: 500, message: 'Something went wrong!' }));
    }

  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const userId: string = req.params.id;
    try {
      const deleteUser = await UserService.delete(userId);
      return res.status(200).send({ deleteUser });
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
