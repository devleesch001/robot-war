import { Router } from 'express';
import { Robot } from '../models/RobotModel.js';
import { robotStat } from '../services/RobotService.js';

const router = Router();

router.get('/', async (req, res) => {
    const robot = await Robot.find().lean().exec();
    const stats = await robotStat(req.query.id);
    return res.status(200).json({ ...robot, stats: stats });
});

export default router;
