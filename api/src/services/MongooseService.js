import mongoose from 'mongoose';

export const init = async () => {
    mongoose.set('strictQuery', true);
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
};

const close = async () => {
    await mongoose.disconnect();
};

export default { init, close };
