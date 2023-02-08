import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';
import { Robot } from '../models/RobotModel.js';
import { Tournoi } from '../models/TournoiModel.js';

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

router.post('/', async (req, res) => {
    try {
        const robots = [];

        req.body.robots.forEach(function (robot, index) {
            robots.push(robot);
        });

        console.log(robots);

        const newTournoi = new Tournoi({
            name: 'SALUT',
            robots: robots,
            status: 'WAITING',
            fights: [],
        });

        await newTournoi.save();

        return res.status(200).json({ newTournoi });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }

    // const firstRobot = await Robot.findById(req.body.firstRobotId);
    // const secondRobot = await Robot.findById(req.body.secondRobotId);
    //
    // if (!firstRobot || !secondRobot) {
    //     return res.status(400).json({ message: "L'un des robots n'a pas été trouvé" });
    // }
    //
    // const newCombat = new Combat({
    //     fighters: [firstRobot._id, secondRobot._id],
    //     status: 'WAITING',
    // });
    //
    // await newCombat.save();
    //
    // return res.status(200).json({ newCombat });
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
