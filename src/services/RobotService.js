import { Combat } from '../models/CombatModel.js';
import { Ordeal } from '../models/OrdealModel.js';
import { Robot } from '../models/RobotModel.js';

export async function robotStat(idrobot) {
    const stat = { win: 0, draw: 0, loose: 0, score: 0, meleegenerale: 0, boule: 0, parcours: 0, degats: 0 };
    const robot = await Robot.findById(idrobot);
    const allCombat = await Combat.find().populate('fighters').populate('win').populate('nextfight');
    allCombat.forEach(function (combat) {
        if (combat.fighters.find((e) => e._id.toString() === idrobot)) {
            if (combat.fighters.find((e) => e.name.includes('Bot'))) {
                /* empty */
            } else {
                if (combat.win !== undefined) {
                    console.log(combat.fighters);
                    if (!robot.name.includes('Bot')) {
                        if (combat.win === null) {
                            stat.score = stat.score + 2;
                            stat.draw = stat.draw + 1;
                        } else if (combat.win._id.toString() === idrobot) {
                            stat.score = stat.score + 4;
                            stat.win = stat.win + 1;
                        } else {
                            stat.loose = stat.loose + 1;
                        }
                    }
                }
            }

            if (combat.winners !== undefined) {
                // récupère les clés de l'objet winners
                const listKeys = Object.keys(combat.winners);
                // recherche la clé correspondant à l'idrobot
                const foundKey = listKeys.find((key) => combat.winners[key] === idrobot);
                if (foundKey) {
                    if (foundKey == 1) {
                        stat.meleegenerale = stat.meleegenerale + 10;
                        stat.score = stat.score + 10;
                    } else if (foundKey == 2) {
                        stat.meleegenerale = stat.meleegenerale + 5;
                        stat.score = stat.score + 5;
                    } else if (foundKey == 3) {
                        stat.meleegenerale = stat.meleegenerale + 3;
                        stat.score = stat.score + 3;
                    } else if (foundKey == 4) {
                        stat.meleegenerale = stat.meleegenerale + 1;
                        stat.score = stat.score + 1;
                    }
                }
            }
        }
    });

    // allCombat.forEach(function (combat) {
    //     if (combat.fighters.find((e) => e._id.toString() === idrobot)) {
    //         console.log(combat.fighters);
    //     }
    // });

    // ########################################################################################

    const allOrdeal = await Ordeal.find().populate('robots');
    allOrdeal.forEach(function (ordeal) {
        if (ordeal.type === 'PINGPONG') {
            if (ordeal.robots.find((e) => e._id.toString() === idrobot)) {
                stat.boule = parseInt(ordeal.score[idrobot]);
            }
        }

        if (ordeal.type === 'PARCOURS') {
            if (ordeal.robots.find((e) => e._id.toString() === idrobot)) {
                stat.parcours = parseInt(ordeal.score[idrobot]);
            }
        }

        if (ordeal.type === 'DEGATS') {
            if (ordeal.robots.find((e) => e._id.toString() === idrobot)) {
                stat.degats = parseInt(ordeal.score[idrobot]);
            }
        }

        // idrobot
    });

    return stat;
}
