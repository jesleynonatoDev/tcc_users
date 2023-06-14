import { Response } from 'express';
import ApiError, { APIError } from '@src/utils/errors/api-error';


export abstract class BaseController {
  
    public abstract create(req: Request, res: Response): Promise<void>;
    public abstract getAll(req: Request, res: Response): Promise<Response>;
    public abstract findById(req: Request, res: Response): Promise<Response>;

    protected sendErrorResponse(res: Response, apiError: APIError): Response {
        return res.status(apiError.code).send(ApiError.format(apiError));
    }
}