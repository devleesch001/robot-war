import { Router } from 'express';
import { Ordeal } from '../models/OrdealModel.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allOrdeal = await Ordeal.findById(req.query.id).populate('robots');
        return res.status(200).json(allOrdeal);
    } else if (typeof req.query.idrobot === 'string') {
        const ordealRobot = [];
        const allOrdeal = await Ordeal.find().populate('robots');
        allOrdeal.forEach(function (ordeal) {
            if (ordeal.robots.find((e) => e._id.toString() === req.query.idrobot)) {
                ordealRobot.push(ordeal);
            }
        });
        return res.status(200).json(ordealRobot);
    } else {
        const allOrdeal = await Ordeal.find().populate('robots');
        return res.status(200).json(allOrdeal);
    }
});

router.post('/', async (req, res) => {
    try {
        const newOrdeal = new Ordeal({
            robots: req.body.robots,
            status: 'WAITING',
            type: req.body.type,
        });

        await newOrdeal.save();

        return res.status(200).json({ newOrdeal });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

router.patch('/', async (req, res) => {
    try {
        const ordeal = await Ordeal.findById(req.body.id);

        if (req.body.score instanceof Object) {
            ordeal.score = req.body.score;
        }

        if (typeof req.body.duration === 'number') {
            ordeal.duration = req.body.duration;
        }

        if (req.body.startedAt instanceof Date || req.body.startedAt === null) {
            ordeal.startedAt = req.body.startedAt;
        }

        if (req.body.status) {
            ordeal.status = req.body.status;
        }

        await ordeal.save();

        return res.status(200).json(ordeal);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

export default router;
