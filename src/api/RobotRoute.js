import { Router } from 'express';
import { Robot } from '../models/RobotModel.js';
import { robotStat } from '../services/RobotService.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.name === 'string') {
        const robot = await Robot.findOne({ name: req.query.name });
        return res.status(200).json(robot);
    } else if (typeof req.query.id === 'string') {
        const robot = await Robot.findById(req.query.id).lean().exec();
        const stats = await robotStat(req.query.id);
        return res.status(200).json({ ...robot, stats: stats });
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
