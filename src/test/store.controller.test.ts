import { Request, Response } from 'express';
import { getClosestStoreController, getAllStoresController } from '../controllers/store.controller';
import { findClosestStoreService, findAllStoresService } from '../services/store.service';
import { HttpCodes } from '../enums/httpCodes.enum';
import { jest } from '@jest/globals';

jest.mock('../services/store.service', () => ({
  findClosestStoreService: jest.fn(),
  findAllStoresService: jest.fn(),
}));

describe('getClosestStoreController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      query: {
        lat: '1.234',
        lon: '5.678',
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle missing latitude and longitude', async () => {
    req.query = {};

    await getClosestStoreController(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Latitude and longitude are required',
      message: 'error',
      statusCode: HttpCodes.BAD_REQUEST,
    });
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    (findClosestStoreService as jest.Mock).mockRejectedValue(error as never);

    await getClosestStoreController(req, res);

    expect(findClosestStoreService).toHaveBeenCalledWith(1.234, 5.678);
    expect(res.status).toHaveBeenCalledWith(HttpCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error finding store',
      error: error.message || 'Unknown error',
      statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  });
});

describe('getAllStoresController', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      query: {
        page: '1',
      },
    } as unknown as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all stores', async () => {
    const stores = [{ id: 1, name: 'Store 1' }, { id: 2, name: 'Store 2' }];
    (findAllStoresService as jest.Mock).mockResolvedValue(stores as never);

    await getAllStoresController(req, res);

    expect(findAllStoresService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(HttpCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Stores found',
      statusCode: HttpCodes.OK,
      data: stores,
    });
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    (findAllStoresService as jest.Mock).mockRejectedValue(error as never);

    await getAllStoresController(req, res);

    expect(findAllStoresService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(HttpCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      error: error.message || 'Unknown error',
      message: 'Error finding stores',
      statusCode: HttpCodes.INTERNAL_SERVER_ERROR,
    });
  });
});
