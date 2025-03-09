import { model, Schema } from 'mongoose';

const waterSchema = new Schema(
  {
    value: {
      type: Number,
      require: true,
      default: 50,
    },
    date: {
      type: String,
      require: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  },
);

export const waterCollection = model('water', waterSchema);
