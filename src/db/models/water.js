import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
  {
    volume: {
      type: Number,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const waterCollection = model('water', waterSchema);
