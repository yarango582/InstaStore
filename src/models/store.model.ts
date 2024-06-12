import { Schema, model, Document } from 'mongoose';

interface IStore extends Document {
  storeId: string;
  storeName: string;
  isOpen: boolean;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

const storeSchema = new Schema<IStore>({
  storeId: { type: String, required: true },
  storeName: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  }
});

storeSchema.index({ location: '2dsphere' });

const Store = model<IStore>('Store', storeSchema);

export default Store;
