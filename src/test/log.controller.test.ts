import { Request, Response } from 'express';
import { getAllLogsController } from '../controllers/log.controller';
import { findAllLogsService } from '../services/log.service';
import { jest } from '@jest/globals';


jest.mock('../services/log.service', () => ({
  findAllLogsService: jest.fn(),
}));

describe('getAllLogsController', () => {
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

  it('should return all logs', async () => {
    const logs = [{ id: 1, message: 'Log 1' }, { id: 2, message: 'Log 2' }];
    (findAllLogsService as jest.Mock).mockResolvedValue(logs as never);

    await getAllLogsController(req, res);

    expect(findAllLogsService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Logs found',
      statusCode: 200,
      data: logs,
    });
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    (findAllLogsService as jest.Mock).mockRejectedValue(error as never);

    await getAllLogsController(req, res);

    expect(findAllLogsService).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: error.message || 'Unknown error',
      message: 'Error finding logs',
      statusCode: 500,
    });
  });
});