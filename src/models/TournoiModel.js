import mongoose from 'mongoose';

// Définir le schéma de données pour les combats
const tournoiSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        robots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Robot',
            },
        ],

        fights: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Combat',
            },
        ],
        win: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Robot',
        },

        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Créer un modèle à partir du schéma de données des combats
export const Tournoi = mongoose.model('Tournoi', tournoiSchema);
