import { createCombat } from './CombatService.js';

export async function createCombatsTournoi(combat, etage, newTournoi) {
    // Crer une liste de combat
    if (etage <= 0) {
        // Remplire les joueurs dans le tableau
        return null;
    } else if (combat == null) {
        combat = await createCombat([], null, 'FINAL');
        newTournoi.fights.push(combat);
        await createCombatsTournoi(combat, etage - 1, newTournoi);
    } else {
        let name = null;
        if (etage - 1 == 0) {
            name = 'INITMATCH';
        } else {
            name = 'TOURNAMENTMATCH';
        }

        const combatFils1 = await createCombat([], combat, name);
        newTournoi.fights.push(combatFils1);
        const combatFils2 = await createCombat([], combat, name);
        newTournoi.fights.push(combatFils2);
        await createCombatsTournoi(combatFils1, etage - 1, newTournoi);
        await createCombatsTournoi(combatFils2, etage - 1, newTournoi);
    }
}

export async function addRobotInCombatsTournoi(newTournoi) {
    let listFighters = newTournoi.fighters.slice();
    newTournoi.fights.forEach(function (combat) {
        if (combat.name === 'INITMATCH') {
            combat.fighters = listFighters.splice(0, 2);
            combat.save();
        }
    });
}
