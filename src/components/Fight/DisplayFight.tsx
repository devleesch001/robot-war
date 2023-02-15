import * as React from 'react';
import { Row, Col, Menu, Typography } from 'antd';
import MediaPlayer from '../DisplayFight/MediaPlayer';
import CardStatisticalFight from '../DisplayFight/CardStatisticalFight';
import RanckingCard from '../DisplayFight/RanckingCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BattleInterface, getBattle } from '../../api/BattleApi';
import { red } from '@ant-design/colors';
import TimerFight from '../Element/Timer';
import { getRobots } from '../../api/RobotApi';
import Winner from './Winner';

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
    // console.log(fight);

    useEffect(() => {
        const interval = setInterval(() => {
            if (fightId) {
                getBattle(fightId)
                    .then((battle) => {
                        setFight(battle);
                    })
                    .catch((err) => console.log(err));
            }
        }, 1000);
        return () => clearInterval(interval);
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
                            <TimerFight fight={fight} isAdmin={isAdmin} />
                            {isAdmin && <Winner fight={fight} isAdmin={isAdmin} />}
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
