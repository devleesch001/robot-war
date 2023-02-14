import { Combat } from '../models/CombatModel.js';

export async function createCombat(listFighters, nextFight, name) {
    const newCombat = new Combat({
        fighters: listFighters,
        status: 'WAITING',
        nextfight: nextFight,
        name: name,
    });

    await newCombat.save();

    return newCombat;
}
