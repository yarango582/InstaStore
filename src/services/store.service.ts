import Store from '../models/store.model';

export const findClosestStore = async (lat: number, lon: number): Promise<any> => {
    const store = await Store.findOne({
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
