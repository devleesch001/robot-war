import React, { useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { BattleInterface, getBattle } from '../../api/BattleApi';
import { updateBattle } from '../../api/BattleApi';
import { log } from 'util';

interface TimerFightProps {
    fight: BattleInterface;
    isAdmin: boolean;
}
const TimerFight: React.FC<TimerFightProps> = (props) => {
    const { fight, isAdmin } = props;

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [displayTime, setDisplayTime] = useState(0);

    React.useEffect(() => {
        if (fight.duration) {
            setTime(fight.duration);
        }
    }, []);

    React.useEffect(() => {
        let interval: any = null;
        setDisplayTime(time);

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setDisplayTime((displayTime) => {
                    return displayTime + 10;
                });
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [time, isActive, isPaused]);

    React.useEffect(() => {
        let interval: any = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((time) => {
                    if (fight._id) {
                        updateBattle({ id: fight._id, duration: time }).catch((err) => console.log(err));
                    }

                    return time + 1000;
                });
            }, 1000);
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
        updateBattle({ id: fight?._id ?? '', duration: 0 }).then();
    };

    return (
        <Row gutter={[16, 16]}>
            <Col>
                <Row style={{ justifyContent: 'space-around' }}>
                    <Typography.Text style={{ fontSize: '50px' }}>{(displayTime / 1000).toFixed(2)}</Typography.Text>
                </Row>
                {isAdmin && (
                    <Row style={{ padding: 50 }}>
                        <Button onClick={handleStart}>Start</Button>
                        <Button onClick={handlePauseResume}>Pause</Button>
                        <Button onClick={handleReset}>Reset</Button>
                    </Row>
                )}
            </Col>
        </Row>
    );
};

export default TimerFight;
