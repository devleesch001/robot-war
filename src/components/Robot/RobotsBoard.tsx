import * as React from 'react';
import { Card, Button, Row, Col, Divider } from 'antd';
import { useState } from 'react';
import { getRobots, RobotInterface } from '../../api/RobotApi';

interface RobotLineProps {
    name: string;
}

export const RobotLine: React.FC<RobotLineProps> = (props) => {
    const { name } = props;

    return (
        <Row gutter={[18, 18]} justify={'start'} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <Button type="primary">{name}</Button>
        </Row>
    );
};
const RobotsBoard: React.FC = () => {
    const [robots, setRobots] = useState<RobotInterface[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getRobots().then((robots) => {
                setRobots(robots);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card
            title="RobotsBoard"
            style={{ minWidth: 370 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            {robots.map((robot) => (
                <React.Fragment key={robot._id}>
                    <RobotLine key={robot._id} name={robot.name} />
                    <Divider style={{ color: 'green' }} />
                </React.Fragment>
            ))}
        </Card>
    );
};
export default RobotsBoard;
