import React, { useState } from 'react';
import { Button } from 'antd';

function Timerfight() {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

    React.useEffect(() => {
        let interval: any = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
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
        <div className="stop-watch">
            {time}
            <Button onClick={handleStart}>Start</Button>
            <Button onClick={handlePauseResume}>Pause</Button>
            <Button onClick={handleReset}>Reset</Button>
        </div>
    );
}

export default Timerfight;
