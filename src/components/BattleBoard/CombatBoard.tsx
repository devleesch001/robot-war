import React, { useEffect } from 'react';
import { Card, Divider, Col, Row, Button, Typography } from 'antd';
import { Battle, getListBattle } from '../../api/route';

const combats = [
    { id: 1, fighter: ['equipe1', 'equipe2'] }, //pour plus tard ajouter une images du robot
    { id: 2, fighter: ['equipe4', 'equipe3'] },
    { id: 3, fighter: ['equipe1', 'equipe3'] },
    { id: 4, fighter: ['equipe4', 'equipe2'] },
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
                <Button type="primary">{fighter1}</Button>
            </Col>
            <Col span={8}>
                <Typography.Text strong type={'warning'}>
                    vs
                </Typography.Text>
            </Col>
            <Col span={8}>
                <Button type="primary" danger>
                    {fighter2}
                </Button>
            </Col>
        </Row>
    );
};

const CombatBoard: React.FC = () => {
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
        <Card
            title="Board Fights"
            style={{ minWidth: 280 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            {combats.map((combat) => (
                <React.Fragment key={combat.id}>
                    <BattleLine fighter1={combat.fighter[0]} fighter2={combat.fighter[1]} />
                    <Divider style={{ color: 'green' }} />
                </React.Fragment>
            ))}
        </Card>
    );
};
export default CombatBoard;
