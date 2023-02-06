import { Router } from 'express';
import { Robot } from '../models/RobotModel.js';

const router = Router();

router.post('/', async (req, res) => {
    const robots = await Robot.find();
    console.log(robots);
});

export default router;
