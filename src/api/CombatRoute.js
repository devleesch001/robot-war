import { Router } from 'express';
import { Combat } from '../models/CombatModel.js';
import { createCombat } from '../services/CombatService.js';

const router = Router();

router.get('/', async (req, res) => {
    if (typeof req.query.id === 'string') {
        const allCombat = await Combat.findById(req.query.id)
            .populate('fighters')
            .populate('win')
            .populate('nextfight');
        return res.status(200).json(allCombat);
    } else if (typeof req.query.idrobot === 'string') {
        const combatRobot = [];

        const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');

        allCombat.forEach(function (combat) {
            if (combat.fighters.find((e) => e._id.toString() === req.query.idrobot)) {
                combatRobot.push(combat);
            }
        });

        return res.status(200).json(combatRobot);
    } else {
        const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');
        return res.status(200).json(allCombat);
    }
});

router.post('/', async (req, res) => {
    try {
        let label = null;
        if (req.body.fighters.length > 2) {
            label = 'MELEEGENERALE';
        }
        const newCombat = await createCombat(req.body.fighters, req.body.nextfight, label);

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
            if (combat.nextfight !== undefined) {
                const nextfight = combat.nextfight.toString();
                const combatNewFight = await Combat.findById(nextfight);

                if (combatNewFight.fighters.find((e) => e._id.toString() === req.body.win)) {
                    return res.status(500).json({ message: 'Internal Error' });
                }
                combatNewFight.fighters.push(req.body.win);

                await combatNewFight.save();
            }
        }

        if (typeof req.body.fighter === 'string') {
            combat.fighters.push(req.body.fighter);
        }

        if (req.body.winners instanceof Object) {
            if (combat.fighters.length > 2) {
                combat.winners = req.body.winners;
            }
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

        await combat.save();

        return res.status(200).json(combat);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' });
    }
});

export default router;
