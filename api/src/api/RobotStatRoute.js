import { Router } from 'express';
import { Robot } from '../models/RobotModel.js';
import { robotStat } from '../services/RobotService.js';

const router = Router();

router.get('/', async (req, res) => {
    const listFinal = [];
    const robots = await Robot.find().lean().exec();
    for (const robot of robots) {
        const stats = await robotStat(robot._id.toString());
        listFinal.push({ ...robot, stats: stats });
    }
    return res.status(200).json(listFinal);
});

export default router;
