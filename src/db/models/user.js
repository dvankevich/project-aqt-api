import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['woman', 'man'], default: 'woman' },
    weight: { type: Number, default: 0 },
    dailySportTime: { type: Number, default: 0 },
    dailyNorm: { type: Number, default: 1500 },
    avatarUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/dvc0lg6q7/image/upload/v1741163238/person_qyhqpa.png',
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
