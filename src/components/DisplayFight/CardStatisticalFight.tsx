import React from 'react';
import { Card, Col, Divider, Row, Typography } from 'antd';
import { BattleInterface } from '../../api/BattleApi';
import LabelRobot, { WinPos } from '../Element/LabelRobot';
import Label from '../Element/Label';
import { blue } from '@ant-design/colors';

// interface TeamCardProps {
//     fighters: RobotInterface[];
// }

// Rappeller du bareme de point
// 4/victoire
// 2/egaliter
// 2/bonus finaliste
// 0/defaite

interface CardStatsInterface {
    fight: BattleInterface;
}

const Card1vs1: React.FC<CardStatsInterface> = (props) => {
    const { fight } = props;

    return (
        <Card title="Stats" style={{ minWidth: 370 }} headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}>
            <Row gutter={16}>
                {fight.fighters.map((fighter, index) => (
                    <Col key={index} span={12}>
                        <Row style={{ alignItems: 'baseline', justifyContent: 'space-around' }}>
                            <Typography.Title level={5}>Team:</Typography.Title>
                            <LabelRobot fighter={fighter} pos={WinPos.END} battle={fight} color={blue[5]}>
                                {fighter.name}
                            </LabelRobot>
                        </Row>
                        <Divider />
                        <Row style={{ alignItems: 'baseline', justifyContent: 'space-around' }}>
                            <Typography.Title level={5}>Wins:</Typography.Title>
                            <Label color={blue[5]}>{fighter.name}</Label>
                        </Row>
                        <Divider />
                        <Row style={{ alignItems: 'baseline', justifyContent: 'space-around' }}>
                            <Typography.Title level={5}>Draws:</Typography.Title>
                            <Label color={blue[5]}>{fighter.name}</Label>
                        </Row>
                        <Row style={{ alignItems: 'baseline', justifyContent: 'space-around' }}>
                            <Typography.Title level={5}>Loses:</Typography.Title>
                            <Label color={blue[5]}>{fighter.name}</Label>
                        </Row>
                        <Divider />
                        <Row style={{ alignItems: 'baseline', justifyContent: 'space-around' }}>
                            <Typography.Title level={5}>Ranking:</Typography.Title>
                            <Label color={blue[5]}>{fighter.name}</Label>
                        </Row>
                        <Divider />
                        <Row style={{ alignItems: 'baseline', justifyContent: 'space-around' }}>
                            <Typography.Title level={5}>score:</Typography.Title>
                            <Label color={blue[5]}>{fighter.name}</Label>
                        </Row>
                        <Divider type={'vertical'} dashed={false} />
                    </Col>
                ))}
            </Row>
        </Card>
    );
};
export default Card1vs1;
