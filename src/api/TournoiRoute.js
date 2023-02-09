import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';
import { Robot } from '../models/RobotModel.js';
import { Tournoi } from '../models/TournoiModel.js';
import { createCombat } from './CombatRoute.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allTournois = await Combat.findById(req.query.id).populate('fighters').populate('win');
        return res.status(200).json(allTournois);
    } else if (typeof req.query.name === 'string') {
        const allTournois = await Robot.findOne({ name: req.query.name });
        return res.status(200).json(allTournois);
    } else {
        const allTournois = await Combat.find().populate('robots').populate('fights').populate('win');
        return res.status(200).json(allTournois);
    }
});

async function createCombatsTournoi(combat, etage, newTournoi) {
    console.log('999999999998');
    // Crer une liste de combat
    if (etage <= 0) {
        return null;
    } else if (combat == null) {
        console.log('8888888888888888888888888');
        combat = await createCombat([], null);
        console.log(combat);
        newTournoi.fights.push(combat);
        console.log('254285221558');
        await createCombatsTournoi(combat, etage - 1, newTournoi);
    } else {
        const combatFils1 = await createCombat([], combat);
        newTournoi.fights.push(combatFils1);
        const combatFils2 = await createCombat([], combat);
        newTournoi.fights.push(combatFils2);
        await createCombatsTournoi(combatFils1, etage - 1, newTournoi);
        await createCombatsTournoi(combatFils2, etage - 1, newTournoi);
    }
}

router.post('/', async (req, res) => {
    try {
        const robots = [];

        let numberRobots = req.body.fighters.length;
        if (!(numberRobots && (numberRobots & (numberRobots - 1)) === 0)) {
            return res.status(500).json({ message: 'Internal Error' });
        }

        req.body.fighters.forEach(function (robot, index) {
            robots.push(robot);
        });

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

        console.log(robots);

        const newTournoi = new Tournoi({
            name: 'SALUT',
            fighters: robots,
            status: 'WAITING',
            fights: [],
        });

        console.log('qsdfghsffeffefefefefef');

        await createCombatsTournoi(null, 3, newTournoi);
        console.log('afaffafffa');

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
