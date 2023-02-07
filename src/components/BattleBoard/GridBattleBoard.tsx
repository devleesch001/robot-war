import React, { useEffect } from 'react';
import { Card, Divider, Col, Row } from 'antd';
import { Battle, getListBattle } from '../../api/route';
import { ColumnsType } from 'antd/lib/table';

const combats = [
    { id: 1, fighter: ['equipe1', 'equipe2'] }, //pour plus tard ajouter une images du robot
    { id: 2, fighter: ['equipe4', 'equipe3'] },
    { id: 3, fighter: ['equipe1', 'equipe3'] },
    { id: 4, fighter: ['equipe4', 'equipe2'] },
];

interface DataType {
    id: number;
    team1: string;
    team2: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Ordre Combat',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Team 1',
        dataIndex: 'team1',
        key: 'team1',
    },
    {
        title: 'Team 2',
        dataIndex: 'team 2',
        key: 'team 2',
    },
];

const GridCombatBoard: React.FC = () => {
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

    return <></>;
};
export default GridCombatBoard;
