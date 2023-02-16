import { Combat } from '../models/CombatModel.js';

export async function createCombat(listFighters, nextFight, label) {
    const newCombat = new Combat({
        fighters: listFighters,
        status: 'WAITING',
        nextfight: nextFight,
        label: label,
    });

    await newCombat.save();

    return newCombat;
}
