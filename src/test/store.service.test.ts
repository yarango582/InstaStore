import { findClosestStoreService } from '../services/store.service';
import Store from '../models/store.model';
import { jest } from '@jest/globals';

jest.mock('../models/store.model');

describe('findClosestStore', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the closest store', async () => {
        const store = {
            storeId: '1',
            storeName: 'Store A',
            isOpen: true,
            location: {
                coordinates: [10.123, 20.456]
            }
        };
        (Store.findOne as jest.Mock).mockReturnValueOnce({
            exec: jest.fn().mockResolvedValueOnce(store as never)
        });

        const result = await findClosestStoreService(10.123, 20.456);

        expect(Store.findOne).toHaveBeenCalledWith({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [20.456, 10.123]
                    },
                    $maxDistance: 5000
                }
            }
        });
        expect(result).toEqual({
            storeId: '1',
            storeName: 'Store A',
            isOpen: true,
            coordinates: [10.123, 20.456]
        });
    });

    it('should throw an error if no stores are found', async () => {
        (Store.findOne as jest.Mock).mockReturnValueOnce({
            exec: jest.fn().mockResolvedValueOnce(null as never)
        });

        await expect(findClosestStoreService(10.123, 20.456)).rejects.toThrow('No stores found');
    });
});