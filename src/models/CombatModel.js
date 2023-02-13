import mongoose from 'mongoose';

// Définir le schéma de données pour les combats
const combatSchema = new mongoose.Schema(
    {
        fighters: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Robot',
            },
        ],
        win: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Robot',
        },
        nextfight: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Combat',
        },
        name: {
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
export const Combat = mongoose.model('Combat', combatSchema);
