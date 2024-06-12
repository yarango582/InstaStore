import NodeCache from "node-cache";
import LogModel from "../models/log.model";

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

export const findAllLogsService = async (page: number = 1): Promise<any> => {
    const cacheKey = `logs_page_${page}`;
    const cachedLogs = cache.get(cacheKey);

    if (cachedLogs) {
        return cachedLogs;
    }

    const fields = {
        endpoint: 1,
        request: 1,
        response: 1,
        timestamp: 1
    };

    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    const logs = await LogModel.find({}, fields)
        .skip(skip)
        .limit(pageSize)
        .exec();

    const result = {
        logs,
        page,
        pageSize,
    };

    cache.set(cacheKey, result);

    return result;
}