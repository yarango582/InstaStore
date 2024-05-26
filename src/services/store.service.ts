import NodeCache from 'node-cache';
import StoreModel from '../models/store.model';

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

export const findClosestStoreService = async (lat: number, lon: number): Promise<any> => {
    const store = await StoreModel.findOne({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lon, lat]
                },
                $maxDistance: 5000 // 5 km radius
            }
        }
    }).exec();

    if (!store) {
        throw new Error('No stores found');
    }

    return {
        storeId: store.storeId,
        storeName: store.storeName,
        isOpen: store.isOpen,
        coordinates: store.location.coordinates
    };
};

export const findAllStoresService = async (page: number = 1): Promise<any> => {
    const cacheKey = `stores_page_${page}`;
    const cachedStores = cache.get(cacheKey);

    if (cachedStores) {
        return cachedStores;
    }

    const fields = {
        storeId: 1,
        storeName: 1,
    };

    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const stores = await StoreModel.find({}, fields)
        .skip(skip)
        .limit(pageSize)
        .exec();

    const result = {
        stores,
        page,
        pageSize,
    };

    cache.set(cacheKey, result);

    return result;
};
