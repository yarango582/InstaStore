import { Request, Response } from 'express';
import { findClosestStoreService, findAllStoresService } from '../services/store.service';
import { IOperationResult } from '../interfaces/response.interface';
import Log from '../models/log.model';
import { HttpCodes } from '../enums/httpCodes.enum';

export const getClosestStoreController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      res.status(HttpCodes.BAD_REQUEST).json({
        error: 'Latitude and longitude are required',
        message: 'error',
        statusCode: HttpCodes.BAD_REQUEST
      } as IOperationResult);
      return;
    }
    const store = await findClosestStoreService(parseFloat(lat as string), parseFloat(lon as string));

    // Log the request
    const log = new Log({
      endpoint: '/api/stores/closest',
      request: req.query,
      response: store,
      timestamp: new Date(),
    });
    await log.save();

    res.status(HttpCodes.OK).json({
      message: 'Store found',
      statusCode: HttpCodes.OK,
      data: store,
    } as IOperationResult);
  } catch (err) {
    const error = err as Error;
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error finding store',
      error: error.message || 'Unknown error',
      statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
    } as IOperationResult);
  }
};

export const getAllStoresController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page } = req.query;
    const stores = await findAllStoresService(Number(page));
    res.status(HttpCodes.OK).json({
      message: 'Stores found',
      statusCode: HttpCodes.OK,
      data: stores,
    } as IOperationResult);
  } catch (err) {
    const error = err as Error;
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || 'Unknown error',
      message: 'Error finding stores',
      statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
    } as IOperationResult);
  }
}