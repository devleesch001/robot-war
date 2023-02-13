import { Router } from 'express';
import { Robot } from '../models/RobotModel.js';
import { Combat } from '../models/CombatModel.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.name === 'string') {
        console.log(req.query.name);
        const allRobot = await Robot.findOne({ name: req.query.name });
        return res.status(200).json(allRobot);
    } else if (typeof req.query.id === 'string') {
        const allRobot = await Robot.findById(req.query.id);
        return res.status(200).json(allRobot);
    } else if (typeof req.query.idrobotstat === 'string') {
        let compteurWin = 0;
        const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');

        allCombat.forEach(function (combat) {
            if (combat.fighters.find((e) => e._id.toString() === req.query.idrobotstat)) {
                if (combat.win == null) {
                    compteurWin = compteurWin + 2;
                } else if (combat.win._id.toString() == req.query.idrobotstat) {
                    compteurWin = compteurWin + 4;
                }
            }
        });
        return res.status(200).json(compteurWin);
    } else {
        const allRobot = await Robot.find();
        return res.status(200).json(allRobot);
    }
});

router.post('/', async (req, res) => {
    try {
        const newRobot = new Robot({
            name: req.body.name,
        });
        console.log(newRobot);

        await newRobot.save();

        return res.status(200).json(newRobot);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

export default router;
