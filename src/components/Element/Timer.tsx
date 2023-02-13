import React, { useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { BattleInterface } from '../../api/BattleApi';
import { updateBattle } from '../../api/BattleApi';

interface TimerFightProps {
    fight: BattleInterface;
}
const TimerFight: React.FC<TimerFightProps> = (props) => {
    const { fight } = props;

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(fight.duration ?? 0);

    React.useEffect(() => {
        let interval: any = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((time) => {
                    updateBattle({ id: fight?._id ?? '', duration: time }).then();
                    return time + 100;
                });
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    };

    return (
        <Row gutter={[16, 16]}>
            <Col>
                <Row style={{ justifyContent: 'space-around' }}>
                    <Typography.Text style={{ fontSize: '50px' }}>{(time / 1000).toFixed(2)}</Typography.Text>
                </Row>
                <Row style={{ padding: 50 }}>
                    <Button onClick={handleStart}>Start</Button>
                    <Button onClick={handlePauseResume}>Pause</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </Row>
            </Col>
        </Row>
    );
};

export default TimerFight;
