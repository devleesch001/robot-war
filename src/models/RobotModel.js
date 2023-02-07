import mongoose from 'mongoose';

// Définir le schéma de données pour les robots
const robotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
export const Robot = mongoose.model('Robot', robotSchema);
