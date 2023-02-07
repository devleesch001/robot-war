import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';
import { Robot } from '../models/RobotModel.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allCombat = await Combat.findById(req.query.id);
        return res.status(200).json(allCombat);
    } else {
        const allCombat = await Combat.find();
        return res.status(200).json(allCombat);
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);

    const firstRobot = await Robot.findById(req.body.firstRobotId);
    const secondRobot = await Robot.findById(req.body.secondRobotId);

    if (!firstRobot || !secondRobot) {
        return res.status(400).json({ message: "L'un des robots n'a pas été trouvé" });
    }

    const newCombat = new Combat({
        fighters: [firstRobot._id, secondRobot._id],
        win: null,
    });

    await newCombat.save();

    return res.status(200).json({ newCombat });
});

router.patch('/', async (req, res) => {
    const combat = await Combat.findById(req.body.id);
    if (!combat) {
        return res.status(404).json({ message: 'Combat introuvable' });
    }

    combat.win = req.body.win;
    await combat.save();

    return res.status(200).json({ message: 'Le combat a été mis à jour' });
});

export default router;
