import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Modal, Row, Tooltip, Typography } from 'antd';
import { BattleInterface, getBattles } from '../../api/BattleApi';
import { RobotInterface } from '../../api/RobotApi';
import { blue, yellow } from '@ant-design/colors';
import LabelRobot, { WinPos } from '../Element/LabelRobot';
import { StopFilled, EyeFilled, EditFilled, HourglassFilled, CheckCircleFilled } from '@ant-design/icons';
import UpdateRobot from '../Robot/UpdateRobot';
import UpdateFight from './UpdateFight';

function isWinner(fighter: RobotInterface, battle: BattleInterface) {
    return battle.win === undefined ? battle.win : battle.win?._id === fighter._id;
}

interface BattleLineProps {
    battle: BattleInterface;
    admin: boolean;
    handleEdit(combat: BattleInterface): void;
}

export const BattleLine: React.FC<BattleLineProps> = (props) => {
    const { battle, admin, handleEdit } = props;

    const labels = battle.fighters.map((fighter, index, array) => (
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
    ));

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
        <Row
            gutter={[18, 18]}
            style={{ display: 'flex', textAlign: 'center', verticalAlign: 'middle', alignItems: 'center' }}
            justify={'space-around'}
        >
            <Col span={2}>
                <Tooltip title={battle.status}>
                    <Button type="default" shape="circle">
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
            <Col span={1}>
                <Divider type={'vertical'} style={{ height: '100%' }} />
            </Col>
            <Col span={18}>
                <Row
                    style={{
                        alignItems: 'center',
                    }}
                    justify={'space-between'}
                >
                    {lineElement.map((value) => value)}
                </Row>
            </Col>
            <Col span={1}>
                <Divider type={'vertical'} style={{ height: '100%' }} />
            </Col>
            <Col span={2} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Row gutter={[18, 18]} justify={'space-around'} style={{ flexWrap: 'nowrap' }}>
                    {admin && (
                        <Button type="default" shape="circle" onClick={() => handleEdit(battle)}>
                            <EditFilled style={{ color: blue[5], fontSize: '20px' }} />
                        </Button>
                    )}
                    <Button href={`fights/${battle._id}`} type="default" shape="circle">
                        <EyeFilled style={{ color: blue[5], fontSize: '20px' }} />
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

const FightBoard: React.FC = () => {
    const [battles, setBattles] = React.useState<BattleInterface[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getBattles().then((battles) => {
                setBattles(battles.filter((element) => element?.fighters && element.fighters.length >= 2));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setEditBattleId(null);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setEditBattleId(null);
        setIsModalOpen(false);
    };

    const [editBattleId, setEditBattleId] = useState<string | null>(null);
    const edit = (battle: BattleInterface) => {
        if (battle?._id) {
            setEditBattleId(battle._id);
            showModal();
        }
    };

    return (
        <Card
            title="Board Fights"
            style={{ minWidth: 370 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            {battles.map((battle) => (
                <React.Fragment key={battle._id}>
                    <BattleLine battle={battle} admin={true} handleEdit={() => edit(battle)} />
                    <Divider />
                </React.Fragment>
            ))}
            <Modal title="Update Fight" open={isModalOpen} onCancel={handleCancel} footer={[]}>
                {editBattleId && <UpdateFight handleCancel={handleCancel} handleOk={handleOk} id={editBattleId} />}
            </Modal>
        </Card>
    );
};
export default FightBoard;
