import React, { useEffect, useState } from 'react';
import { Card, Col, Divider, Row, Typography } from 'antd';
import { BattleInterface } from '../../../api/BattleApi';
import LabelRobot, { WinPos } from '../../Element/LabelRobot';
import Label from '../../Element/Label';
import { blue } from '@ant-design/colors';
import { getRobot, RobotInterface } from '../../../api/RobotApi';

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

const CardStatisticalFight: React.FC<CardStatsInterface> = (props) => {
    const { fight } = props;

    const [robots, setRobots] = useState<RobotInterface[]>([]);

    useEffect(() => {
        Promise.all(fight.fighters.map(async (robot) => await getRobot({ id: robot._id ?? '' }))).then((robots) =>
            setRobots(robots.sort((robotA, robotB) => robotB.stats.score - robotA.stats.score))
        );
    }, [fight]);

    return (
        <Card title="Stats" style={{ minWidth: 400 }} headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}>
            <Row gutter={16} style={{ alignItems: 'baseline' }}>
                {robots.map((fighter, index) => (
                    <Col key={index} span={12}>
                        <div style={{ marginRight: 25 }}>
                            <Row style={{ alignItems: 'baseline' }}>
                                <Typography.Title level={5} style={{ marginRight: 25 }}>
                                    Team:
                                </Typography.Title>
                                <LabelRobot fighter={fighter} pos={WinPos.END} battle={fight} color={blue[5]}>
                                    {fighter.name}
                                </LabelRobot>
                            </Row>
                            <Divider />
                            <Row style={{ alignItems: 'baseline' }}>
                                <Typography.Title level={5} style={{ marginRight: 25 }}>
                                    Wins:
                                </Typography.Title>
                                <Label color={blue[5]}>{fighter.stats.win}</Label>
                            </Row>
                            <Divider />
                            <Row style={{ alignItems: 'baseline' }}>
                                <Typography.Title level={5} style={{ marginRight: 25 }}>
                                    Draws:
                                </Typography.Title>
                                <Label color={blue[5]}>{fighter.stats.draw}</Label>
                            </Row>
                            <Row style={{ alignItems: 'baseline' }}>
                                <Typography.Title level={5} style={{ marginRight: 25 }}>
                                    Looses:
                                </Typography.Title>
                                <Label color={blue[5]}>{fighter.stats.loose}</Label>
                            </Row>
                            <Divider />
                            <Row style={{ alignItems: 'baseline' }}>
                                <Typography.Title level={5} style={{ marginRight: 25 }}>
                                    Ranking:
                                </Typography.Title>
                                <Label color={blue[5]}>{index + 1}</Label>
                            </Row>
                            <Divider />
                            <Row style={{ alignItems: 'baseline' }}>
                                <Typography.Title level={5} style={{ marginRight: 25 }}>
                                    score:
                                </Typography.Title>
                                <Label color={blue[5]} style={{ marginRight: 25 }}>
                                    {fighter.stats.score}
                                </Label>
                            </Row>
                            <Divider type={'vertical'} dashed={false} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};
export default CardStatisticalFight;
