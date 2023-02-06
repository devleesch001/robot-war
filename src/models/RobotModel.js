import mongoose from 'mongoose';

export const Robot = mongoose.model('Robot', { name: String });
