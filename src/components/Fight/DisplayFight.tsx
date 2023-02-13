import * as React from 'react';
import { Row, Col, Menu, Typography } from 'antd';
import MediaPlayer from './DIsplayFight/MediaPlayer';
import CardStatisticalFight from './DIsplayFight/CardStatisticalFight';
import RanckingCard from './DIsplayFight/RanckingCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BattleInterface, getBattle } from '../../api/BattleApi';
import { red } from '@ant-design/colors';
import TimerFight from '../Element/Timer';

type DisplayFightParams = {
    fightId: string;
};

interface DisplayFightProps {
    isAdmin: boolean;
}

const DisplayFight: React.FC<DisplayFightProps> = (props) => {
    const { fightId } = useParams<DisplayFightParams>();

    const { isAdmin } = props;

    const [fight, setFight] = useState<BattleInterface | null>(null);

    useEffect(() => {
        getBattle(fightId ?? '')
            .then((battle) => {
                setFight(battle);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <Menu
                style={{ justifyContent: 'center', backgroundColor: isAdmin ? red[5] : 'black' }}
                mode="horizontal"
                items={[
                    {
                        label: (
                            <Typography.Title level={1} style={{ color: 'white' }}>
                                Robot Wars
                            </Typography.Title>
                        ),
                        key: 'title',
                        disabled: true,
                        style: { cursor: 'default' },
                    },
                ]}
            />
            {fight && (
                <>
                    <Row gutter={16} justify={'center'} style={{ alignItems: 'center' }}>
                        <Col span={14}>
                            <MediaPlayer mediaSrc={'https://youtu.be/mQRcaotzcGs'} />
                        </Col>
                        <Col span={6}>
                            <TimerFight fight={fight}></TimerFight>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} justify={'center'}>
                        <Col span={12}>
                            <CardStatisticalFight fight={fight} />
                        </Col>
                        <Col span={12}>
                            <RanckingCard />
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};
export default DisplayFight;
