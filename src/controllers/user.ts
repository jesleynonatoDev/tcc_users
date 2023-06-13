import { Response, Request } from 'express';
import AuthService from '@src/services/auth';
import { BaseController } from '.';
import { UserRepository } from '@src/repositories';

export class UserController extends BaseController {
    constructor(private userRepository: UserRepository) {
        super();
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newUser = await this.userRepository.create(req.body);
            res.status(200).send(newUser)
        } catch (err) {
            this.sendCreateUpdateErrorResponse(res, err);
        }
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        const user = await this.userRepository.findOneByEmail(req.body.email);
        if (user) {
            return this.sendErrorResponse(res, {
                code: 401,
                message: 'User not found!',
                description: 'Try verifying your email address.'
            });
        }
        if (!(await AuthService.comparePassword(req.body.password, user.password))) {
            return this.sendErrorResponse(res, {
                code: 401,
                message: 'Password does not match'
            });
        }
        const token = AuthService.generateToken(user.id);
        return res.send({ ...user, ...{ token } });
    }

    public async me(req: Request, res: Response): Promise<Response> {
        const userId = req.context?.userId;

        if (!userId) {
            return this.sendErrorResponse(res, {
                code: 404,
                message: 'User id not provided'
            });
        }
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return this.sendErrorResponse(res, {
                code: 404,
                message: 'User not found'
            })
        }
        return res.send({user})
    }
}