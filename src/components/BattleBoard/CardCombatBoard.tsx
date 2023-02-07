import React, { useEffect } from 'react';
import { Card, Divider, Col, Row } from 'antd';
import { Battle, getListBattle } from '../../api/route';
import { BattleLine } from './GridBattleBoard';

const combats = [
    { id: 1, fighter: ['equipe1', 'equipe2'] }, //pour plus tard ajouter une images du robot
    { id: 2, fighter: ['equipe4', 'equipe3'] },
    { id: 3, fighter: ['equipe1', 'equipe3'] },
    { id: 4, fighter: ['equipe4', 'equipe2'] },
];

const CardCombatBoard: React.FC = () => {
    const [battleList, setbattlelist] = React.useState<Battle[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getListBattle()
                .then((battle) => {
                    setbattlelist(battle);
                })
                .catch((err) => {
                    setbattlelist([]);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Card
                title="Board Fights"
                style={{ minWidth: 280 }}
                headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
            >
                {combats.map((combat) => (
                    <>
                        <BattleLine fighter1={combat.fighter[0]} fighter2={combat.fighter[1]} />
                        <Divider style={{ color: 'green' }} />
                    </>
                ))}
            </Card>
        </>
    );
};
export default CardCombatBoard;
