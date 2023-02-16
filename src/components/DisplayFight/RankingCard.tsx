import React, { useEffect } from 'react';
import { Card, Table } from 'antd';
import { RobotInterface } from '../../api/RobotApi';
import { getRobotsWithStats } from '../../api/RobotApi';

const columns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Robot',
        dataIndex: 'robot',
        key: 'robot',
    },
    {
        title: 'Fight',
        dataIndex: 'fight',
        key: 'fight',
    },
    {
        title: 'Win',
        dataIndex: 'win',
        key: 'win',
    },
    {
        title: 'Draw',
        dataIndex: 'draw',
        key: 'draw',
    },
    {
        title: 'Loose',
        dataIndex: 'loose',
        key: 'loose',
    },
    {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
    },
];

const RanckingCard: React.FC = () => {
    const [robotList, setRobotlist] = React.useState<RobotInterface[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getRobotsWithStats().then((robots) => {
                setRobotlist(robots.sort((robotA, robotB) => robotB.stats.score - robotA.stats.score));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card title="Ranking" style={{ minWidth: 370 }} headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}>
            <Table
                columns={columns}
                dataSource={robotList.map((robot, index) => {
                    return {
                        position: index + 1,
                        robot: robot.name,
                        fight: robot.stats.draw + robot.stats.loose + robot.stats.win,
                        win: robot.stats.win,
                        draw: robot.stats.draw,
                        loose: robot.stats.loose,
                        point: robot.stats.score,
                    };
                })}
            />
        </Card>
    );
};

export default RanckingCard;
