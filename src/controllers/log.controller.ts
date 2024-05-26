import { Request, Response } from 'express';
import { IOperationResult } from '../interfaces/response.interface';
import { HttpCodes } from '../enums/httpCodes.enum';
import { findAllLogsService } from "../services/log.service";

export const getAllLogsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page } = req.query;
        const logs = await findAllLogsService(Number(page));
        res.status(HttpCodes.OK).json({
        message: 'Logs found',
        statusCode: HttpCodes.OK,
        data: logs,
        } as IOperationResult);
    } catch (err) {
        const error = err as Error;
        res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message || 'Unknown error',
        message: 'Error finding logs',
        statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
        } as IOperationResult);
    }
}