import { Combat } from '../models/CombatModel.js';

export async function robotStat(idrobot) {
    const stat = { win: 0, draw: 0, lose: 0, score: 0 };
    const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');
    allCombat.forEach(function (combat) {
        if (combat.fighters.find((e) => e._id.toString() === idrobot)) {
            if (combat.win == null) {
                stat.score = stat.score + 2;
                stat.draw = stat.draw + 1;
            } else if (combat.win._id.toString() == idrobot) {
                stat.score = stat.score + 4;
                stat.win = stat.win + 1;
            } else {
                stat.lose = stat.lose + 1;
            }
        }
    });
    return stat;
}
