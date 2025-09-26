import mongoose from 'mongoose';

export const init = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI);
};

export default { init };
