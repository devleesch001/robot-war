import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';
import { Robot } from '../models/RobotModel.js';
import { Tournoi } from '../models/TournoiModel.js';
import { createCombat } from './CombatRoute.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allTournois = await Tournoi.findById(req.query.id)
            .populate('fighters')
            .populate('fights')
            .populate('win');
        return res.status(200).json(allTournois);
    } else if (typeof req.query.name === 'string') {
        const allTournois = await Tournoi.findOne({ name: req.query.name })
            .populate('fighters')
            .populate('fights')
            .populate('win');
        return res.status(200).json(allTournois);
    } else {
        const allTournois = await Tournoi.find().populate('fighters').populate('fights').populate('win');
        return res.status(200).json(allTournois);
    }
});

async function createCombatsTournoi(combat, etage, newTournoi) {
    // Crer une liste de combat
    if (etage <= 0) {
        // Remplire les joueurs dans le tableau
        return null;
    } else if (combat == null) {
        combat = await createCombat([], null, null);
        console.log(combat);
        newTournoi.fights.push(combat);
        await createCombatsTournoi(combat, etage - 1, newTournoi);
    } else {
        let name = null;
        if (etage - 1 == 0) {
            name = 'INITMATCH';
        }
        const combatFils1 = await createCombat([], combat, name);
        newTournoi.fights.push(combatFils1);
        const combatFils2 = await createCombat([], combat, name);
        newTournoi.fights.push(combatFils2);
        await createCombatsTournoi(combatFils1, etage - 1, newTournoi);
        await createCombatsTournoi(combatFils2, etage - 1, newTournoi);
    }
}

async function addRobotInCombatsTournoi(newTournoi) {
    let listFighters = newTournoi.fighters.slice();
    console.log(listFighters);
    console.log(newTournoi.fighters);
    newTournoi.fights.forEach(function (combat, index) {
        if (combat.name == 'INITMATCH') {
            combat.fighters = [listFighters[0], listFighters[1]];
            listFighters.splice(0, 2);
        }
    });
    // console.log(newTournoi);
}

function findNumberSteps(totalPlayers) {
    let numberSteps = 0;
    while (Math.pow(2, numberSteps) < totalPlayers) {
        numberSteps++;
    }
    return numberSteps;
}

router.post('/', async (req, res) => {
    try {

        let numberRobots = req.body.fighters.length;
        if (!(numberRobots && (numberRobots & (numberRobots - 1)) === 0)) {
            return res.status(500).json({ message: 'Internal Error' });
        }

        // Mélanger les valeurs de la liste
        // let currentIndex = robots.length,
        //     temporaryValue,
        //     randomIndex;
        //
        // while (0 !== currentIndex) {
        //     // Sélectionnez un élément restant...
        //     randomIndex = Math.floor(Math.random() * currentIndex);
        //     currentIndex -= 1;
        //
        //     // Et échangez-le avec le courant.
        //     temporaryValue = robots[currentIndex];
        //     robots[currentIndex] = robots[randomIndex];
        //     robots[randomIndex] = temporaryValue;
        // }
        //
        // let newRobots = [];
        // for (let i = 0; i < robots.length; i += 2) {
        //     newRobots = robots.slice(i, i + 2);
        // }

        if (typeof req.body.name !== 'string')
            throw new Error("name not a string");


        const newTournoi = await new Tournoi({
            name: req.body.name,
            fighters: req.body.fighters,
            status: 'WAITING',
            fights: [],
        });

        const numberSteps = findNumberSteps(req.body.fighters.length);

        await createCombatsTournoi(null, numberSteps, newTournoi);

        await addRobotInCombatsTournoi(newTournoi);

        await newTournoi.save();

        return res.status(200).json({ newTournoi });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Error' });
    }
});

//
// router.patch('/', async (req, res) => {
//     const combat = await Combat.findById(req.body.id);
//     if (!combat) {
//         return res.status(404).json({ message: 'Combat introuvable' });
//     }
//
//     if (typeof req.body.win === 'string') {
//         combat.win = req.body.win;
//         console.log('111111111111111111');
//     }
//     if (req.body.status) {
//         combat.status = req.body.status;
//         console.log('222222222222222222222');
//     }
//
//     console.log(req.body.status);
//     console.log(combat);
//
//     await combat.save();
//
//     return res.status(200).json({ message: 'Le combat a été mis à jour' });
// });

export default router;
