import React, { useEffect } from 'react';
import { Card, Divider, Col, Row, Table, Grid, Typography } from 'antd';
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

interface BattleLineProps {
    fighter1: string;
    fighter2: string;
}

export const BattleLine: React.FC<BattleLineProps> = (props) => {
    const { fighter1, fighter2 } = props;

    return (
        <Row gutter={[18, 18]} justify={'center'} style={{ textAlign: 'center' }}>
            <Col span={8}>
                <Typography.Text>{fighter1}</Typography.Text>
            </Col>
            <Col span={8}>
                <Typography.Text strong type={'danger'}>
                    vs
                </Typography.Text>
            </Col>
            <Col span={8}>
                <Typography.Text>{fighter2}</Typography.Text>
            </Col>
        </Row>
    );
};

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

    return (
        <>
            <BattleLine fighter1={'test1'} fighter2={'test2'} />
            <Divider style={{ color: 'green' }}></Divider>
            <BattleLine fighter1={'test1'} fighter2={'test2'} />
            <Divider style={{ color: 'green' }}></Divider>
            <BattleLine fighter1={'test1'} fighter2={'test2'} />
            <Divider style={{ color: 'green' }}></Divider>
            <BattleLine fighter1={'test1'} fighter2={'test2'} />
            <Divider style={{ color: 'green' }}></Divider>
        </>
    );
};
export default GridCombatBoard;
