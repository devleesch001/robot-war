import mongoose from 'mongoose';

// Définir le schéma de données pour les combats
const combatSchema = new mongoose.Schema({
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
});

// Créer un modèle à partir du schéma de données des combats
const Combat = mongoose.model("Combat", combatSchema);