import { Router } from 'express';
import { Robot } from '../models/RobotModel.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.name === 'string') {
        console.log(req.query.name);
        const allRobot = await Robot.findOne({ name: req.query.name });
        return res.status(200).json(allRobot);
    } else if (typeof req.query.id === 'string') {
        const allRobot = await Robot.findById(req.query.id);
        return res.status(200).json(allRobot);
    } else {
        const allRobot = await Robot.find();
        return res.status(200).json(allRobot);
    }
});

router.post('/', async (req, res) => {
    const existingRobot = await Robot.findOne({ name: req.body.name });

    if (existingRobot) {
        return res.status(400).json({ message: 'Le robot existe déjà' });
    }
    const newRobot = new Robot({
        name: req.body.name,
    });
    console.log(newRobot);
    return res.status(200).json(newRobot);
});

export default router;
