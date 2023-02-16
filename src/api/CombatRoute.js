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

router.post('/', async (req, res) => {
    try {
        const newCombat = await createCombat(req.body.fighters, req.body.nextfight, null);

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
            console.log(combat);
            // if (combat.name == 'INITMATCH' || combat.name == 'TOURNAMENTMATCH') {
            if (combat.nextfight !== undefined) {
                /* empty */
                console.log('#######################');
                console.log(combat);
                const nextfight = combat.nextfight.toString();
                console.log('#######################');
                console.log(nextfight);
                const combatNewFight = await Combat.findById(nextfight);
                console.log('#######################');
                console.log(combatNewFight);

                if (combatNewFight.fighters.find((e) => e._id.toString() === req.body.win)) {
                    return res.status(500).json({ message: 'Internal Error' });
                }

                combatNewFight.fighters.push(req.body.win);

                console.log('#######################');
                console.log(combatNewFight);

                await combatNewFight.save();
                //
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
