import React from 'react';
import { Card, Divider, Col, Row, Typography } from 'antd';
import { BattleInterface, getBattles } from '../../api/BattleApi';
import { RobotInterface } from '../../api/RobotApi';
import { blue, yellow } from '@ant-design/colors';
import Label from '../Element/Label';
import { CrownFilled } from '@ant-design/icons';

function isWinner(fighter: RobotInterface, battle: BattleInterface) {
    return battle.win === undefined ? battle.win : battle.win?._id === fighter._id;
}

interface BattleLineProps {
    battle: BattleInterface;
}

export const BattleLine: React.FC<BattleLineProps> = (props) => {
    const { battle } = props;

    return battle.fighters.length >= 2 ? (
        <Row gutter={[18, 18]} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <Col span={8}>
                <Row gutter={[18, 18]} justify={'start'}>
                    <Label color={blue[5]} win={isWinner(battle.fighters[0], battle)}>
                        <Typography.Text>{battle.fighters[0].name}</Typography.Text>
                    </Label>
                    {battle.win ? (
                        battle.fighters[0]._id === battle.win._id ? (
                            <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5 }} />
                        ) : (
                            <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5, opacity: 0 }} />
                        )
                    ) : (
                        <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5, opacity: 0 }} />
                    )}
                </Row>
            </Col>
            <Col span={2}>
                <Typography.Text strong type={'warning'} style={{ whiteSpace: 'nowrap' }}>
                    vs
                </Typography.Text>
            </Col>
            <Col span={8}>
                <Row gutter={[18, 18]} justify={'end'}>
                    {battle.win ? (
                        battle.fighters[1]._id === battle.win._id ? (
                            <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5 }} />
                        ) : (
                            <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5, opacity: 0 }} />
                        )
                    ) : (
                        <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5, opacity: 0 }} />
                    )}
                    <Label color={yellow[5]} win={isWinner(battle.fighters[1], battle)}>
                        <Typography.Text>{battle.fighters[1].name}</Typography.Text>
                    </Label>
                </Row>
            </Col>
            <Col span={2}>
                <Divider type={'vertical'} style={{ height: '100%' }} />
            </Col>
            <Col span={4}>
                <Typography.Text style={{ whiteSpace: 'nowrap' }}>{battle.status}</Typography.Text>
            </Col>
        </Row>
    ) : (
        <></>
    );
};

const CombatBoard: React.FC = () => {
    const [battles, setBattles] = React.useState<BattleInterface[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getBattles().then((battle) => {
                setBattles(battle);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card
            title="Board Fights"
            style={{ minWidth: 370 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            {battles.map((battle) => (
                <React.Fragment key={battle._id}>
                    <BattleLine battle={battle} />
                    <Divider style={{ color: 'green' }} />
                </React.Fragment>
            ))}
        </Card>
    );
};
export default CombatBoard;
