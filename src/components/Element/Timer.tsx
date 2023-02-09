import React from 'react';
import { useTimer } from 'react-timer-hook';

interface TimerFightProps {
    expiryTimestamp: Date;
}

const TimerFight: React.FC<TimerFightProps> = (props) => {
    const { expiryTimestamp } = props;
    const { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn('onExpire called'),
    });

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>react-timer-hook </h1>
            <p>Timer Demo</p>
            <div style={{ fontSize: '100px' }}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button
                onClick={() => {
                    // Restarts to 5 minutes timer
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + 300);
                    restart(time);
                }}
            >
                Restart
            </button>
        </div>
    );
};

export default function App() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 200); // 10 minutes timer
    return (
        <div>
            <TimerFight expiryTimestamp={time} />
        </div>
    );
}
