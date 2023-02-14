import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';
import { Robot } from '../models/RobotModel.js';
import { Tournoi } from '../models/TournoiModel.js';
import { createCombatsTournoi } from '../services/TournoiService.js';
import { addRobotInCombatsTournoi } from '../services/TournoiService.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allTournois = await Tournoi.findById(req.query.id)
            .populate('fighters')
            .populate('win')
            .populate({
                path: 'fights',
                model: Combat,
                populate: [{ path: 'fighters', model: Robot }],
            });

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
            throw new Error('numberRobots invalid');
        }

        if (typeof req.body.name !== 'string') throw new Error('name not a string');

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
