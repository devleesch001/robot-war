import React from 'react';
import { Button, Card, Col, Divider, Row, Tooltip, Typography } from 'antd';
import { BattleInterface, getBattles } from '../../api/BattleApi';
import { RobotInterface } from '../../api/RobotApi';
import { blue, yellow } from '@ant-design/colors';
import LabelRobot, { WinPos } from '../Element/LabelRobot';
import { StopFilled, EyeFilled, HourglassFilled, CheckCircleFilled } from '@ant-design/icons';

function isWinner(fighter: RobotInterface, battle: BattleInterface) {
    return battle.win === undefined ? battle.win : battle.win?._id === fighter._id;
}

interface BattleLineProps {
    battle: BattleInterface;
}

export const BattleLine: React.FC<BattleLineProps> = (props) => {
    const { battle } = props;

    const labels = battle.fighters.map((fighter, index, array) => {
        // console.log(fighter);
        return (
            <Row key={index} style={{ padding: 5 }}>
                <LabelRobot
                    color={blue[5]}
                    fighter={fighter}
                    battle={battle}
                    pos={index == 0 ? WinPos.END : array.length == index + 1 ? WinPos.START : WinPos.TWING}
                >
                    <Typography.Text style={{ color: 'white' }}>{fighter.name}</Typography.Text>
                </LabelRobot>
            </Row>
        );
    });

    const lineElement: JSX.Element[] = [];

    labels.forEach((element, index, array) => {
        lineElement.push(element);
        if (array.length !== index + 1)
            lineElement.push(
                <Typography.Text strong type={'warning'} style={{ whiteSpace: 'nowrap' }}>
                    vs
                </Typography.Text>
            );
    });

    return (
        <Row gutter={[18, 18]} style={{ textAlign: 'center', verticalAlign: 'middle' }} justify={'space-around'}>
            <Col span={2} style={{ textAlign: 'center', verticalAlign: 'middle', paddingTop: 5 }}>
                <Button href={`fights/${battle._id}`} type="default" shape="circle" style={{ paddingTop: 5 }}>
                    <EyeFilled style={{ color: blue[5], fontSize: '20px' }} />
                </Button>
            </Col>
            <Col span={1}>
                <Divider type={'vertical'} style={{ height: '100%' }} />
            </Col>
            <Col span={18}>
                <Row justify={'space-between'}>{lineElement.map((value) => value)}</Row>
            </Col>
            <Col span={1}>
                <Divider type={'vertical'} style={{ height: '100%' }} />
            </Col>
            <Col span={2} style={{ paddingTop: 5 }}>
                <Tooltip title={battle.status}>
                    <Button type="default" shape="circle" style={{ paddingTop: 5 }}>
                        {battle.status == 'WAITING' ? (
                            <HourglassFilled />
                        ) : battle.status == 'FINISH' ? (
                            <CheckCircleFilled />
                        ) : battle.status == 'CANCELED' ? (
                            <StopFilled />
                        ) : (
                            <>battle.status</>
                        )}
                    </Button>
                </Tooltip>
            </Col>
        </Row>
    );
};

const FightBoard: React.FC = () => {
    const [battles, setBattles] = React.useState<BattleInterface[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getBattles().then((battles) => {
                setBattles(battles.filter((element) => element?.fighters));
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
                    <Divider />
                </React.Fragment>
            ))}
        </Card>
    );
};
export default FightBoard;
