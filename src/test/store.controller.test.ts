import { Request, Response } from 'express';
import { getClosestStore } from '../controllers/store.controller';
import { findClosestStore } from '../services/store.service';
import Log from '../models/log.model';

// Importación de jest desde @jest/globals
import { jest } from '@jest/globals';

// Mock de los módulos
jest.mock('../services/store.service');
jest.mock('../models/log.model');

describe('getClosestStore', () => {
    let req: Request;
    let res: Response;

    beforeEach(() => {
        req = {
            query: {
                lat: '10.123',
                lon: '20.456',
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

    it('should return the closest store', async () => {
        const store = { storeId: '1', storeName: 'Store A', isOpen: true, coordinates: [10.123, 20.456] };
        (findClosestStore as jest.Mock).mockResolvedValue(store as never);

        await getClosestStore(req, res);

        expect(findClosestStore).toHaveBeenCalledWith(10.123, 20.456);
        expect(Log.prototype.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(store);
    });

    it('should return an error if latitude or longitude are missing', async () => {
        req.query = {};

        await getClosestStore(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Latitude and longitude are required' });
    });

    it('should return an error if an unknown error occurs', async () => {
        const error = new Error('Unknown error');
        (findClosestStore as jest.Mock).mockRejectedValue(error as never);

        await getClosestStore(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: error.message || 'Unknown error' });
    });
});
