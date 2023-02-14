import { Router } from 'express';
import { Robot } from '../models/RobotModel.js';
import { Combat } from '../models/CombatModel.js';

const router = Router();

async function robotStat(idrobot) {
    const stat = { win: 0, draw: 0, lose: 0, score: 0 };
    const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');
    allCombat.forEach(function (combat) {
        if (combat.fighters.find((e) => e._id.toString() === idrobot)) {
            if (combat.win == null) {
                stat.score = stat.score + 2;
                stat.draw = stat.draw + 1;
            } else if (combat.win._id.toString() == idrobot) {
                stat.score = stat.score + 4;
                stat.win = stat.win + 1;
            } else {
                stat.lose = stat.lose + 1;
            }
        }
    });
    return stat;
}
router.get('/', async (req, res) => {
    if (typeof req.query.name === 'string') {
        console.log(req.query.name);
        const robot = await Robot.findOne({ name: req.query.name });
        return res.status(200).json(robot);
    } else if (typeof req.query.id === 'string') {
        const robot = await Robot.findById(req.query.id);
        const stats = await robotStat(req.query.id);
        const robotstat = { robot, stats };
        return res.status(200).json(robotstat);
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
