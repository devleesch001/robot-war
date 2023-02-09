import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';
import { Robot } from '../models/RobotModel.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allCombat = await Combat.findById(req.query.id)
            .populate('fighters')
            .populate('win')
            .populate('nextfight');
        return res.status(200).json(allCombat);
    } else {
        const allCombat = await Combat.find().populate('fighters').populate('win');
        return res.status(200).json(allCombat);
    }
});

export async function createCombat(listFighters, nextFight) {
    if (nextFight === undefined) {
        nextFight = null;
    }

    const newCombat = new Combat({
        fighters: listFighters,
        status: 'WAITING',
        nextfight: nextFight,
    });

    console.log(newCombat);

    await newCombat.save();

    return newCombat;
}
router.post('/', async (req, res) => {
    try {
        const newCombat = createCombat(req.body.fighters, req.body.nextfight);

        console.log(newCombat);

        return res.status(200).json({ newCombat });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

router.patch('/', async (req, res) => {
    try {
        const combat = await Combat.findById(req.body.id);

        if (typeof req.body.win === 'string') {
            combat.win = req.body.win;
        }
        if (req.body.status) {
            combat.status = req.body.status;
        }

        console.log(req.body.status);
        console.log(combat);

        await combat.save();

        return res.status(200).json({ message: 'Le combat a été mis à jour' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

export default router;
