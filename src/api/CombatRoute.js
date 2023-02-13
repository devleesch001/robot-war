import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allCombat = await Combat.findById(req.query.id)
            .populate('fighters')
            .populate('win')
            .populate('nextfight');
        return res.status(200).json(allCombat);
    } else if (typeof req.query.idrobot === 'string') {
        const combatRobotWin = [];

        const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');

        allCombat.forEach(function (combat) {
            if (combat.fighters.find((e) => e._id.toString() === req.query.idrobot)) {
                combatRobotWin.push(combat);
            }
        });

        return res.status(200).json(combatRobotWin);
    } else {
        const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');
        return res.status(200).json(allCombat);
    }
});

export async function createCombat(listFighters, nextFight, name) {
    if (nextFight === undefined) {
        nextFight = null;
    }

    const newCombat = new Combat({
        fighters: listFighters,
        status: 'WAITING',
        nextfight: nextFight,
        name: name,
    });

    console.log(newCombat);

    await newCombat.save();

    return newCombat;
}
router.post('/', async (req, res) => {
    try {
        const newCombat = await createCombat(req.body.fighters, req.body.nextfight, null);

        console.log(newCombat);

        return res.status(200).json({ newCombat });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

router.patch('/', async (req, res) => {
    try {
        const combat = await Combat.findById(req.body.id);

        if (typeof req.body.win === 'string' || req.body.win === null) {
            combat.win = req.body.win;
        }

        if (typeof req.body.duration === 'number') {
            combat.duration = req.body.duration;
        }

        if (req.body.startedAt instanceof Date || req.body.startedAt === null) {
            combat.startedAt = req.body.startedAt;
        }

        if (req.body.status) {
            combat.status = req.body.status;
        }

        console.log(req.body.status);
        console.log(combat);

        await combat.save();

        return res.status(200).json(combat);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

export default router;
