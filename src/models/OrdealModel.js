import mongoose from 'mongoose';

// Définir le schéma de données pour les combats
const ordealSchema = new mongoose.Schema(
    {
        robots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Robot',
            },
        ],

        score: { type: mongoose.Schema.Types.Mixed },

        type: {
            type: String,
        },
        status: {
            type: String,
        },
        startedAt: {
            type: Date,
        },
        duration: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

// Créer un modèle à partir du schéma de données des combats
export const Ordeal = mongoose.model('Ordeal', ordealSchema);
