import { Schema, model, Document } from 'mongoose';

interface ILog extends Document {
  endpoint: string;
  request: any;
  response: any;
  timestamp: Date;
}

const logSchema = new Schema<ILog>({
  endpoint: { type: String, required: true },
  request: { type: Schema.Types.Mixed, required: true },
  response: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, required: true }
});

const Log = model<ILog>('Log', logSchema);

export default Log;
