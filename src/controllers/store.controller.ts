import { Request, Response } from 'express';
import { findClosestStore } from '../services/store.service';
import Log from '../models/log.model';

export const getClosestStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      res.status(400).json({ error: 'Latitude and longitude are required' });
      return;
    }
    const store = await findClosestStore(parseFloat(lat as string), parseFloat(lon as string));

    // Log the request
    const log = new Log({
      endpoint: '/api/stores/closest',
      request: req.query,
      response: store,
      timestamp: new Date(),
    });
    await log.save();

    res.json(store);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
};
