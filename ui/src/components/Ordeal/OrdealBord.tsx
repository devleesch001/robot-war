import * as React from 'react';
import { Card, Button, Form, Input, Select, notification } from 'antd';
import { getRobots, RobotInterface } from '../../api/RobotApi';
const OrdealBord = () => {
    const [robots, setRobots] = React.useState<RobotInterface[]>([]);

    // React.useEffect(() => {
    //     const interval = setInterval(() => {
    //         getRobots().then((robots) => {
    //             const selected = form.getFieldValue('fighters') ?? [];
    //             robots = robots.filter((robot) => !selected.includes(robot._id ?? ''));
    //             setRobots(robots);
    //         });
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <Card
            title="Board Fights"
            style={{ minWidth: 370 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            {/*{robots.map(({ name }) => {*/}
            {/*    {*/}
            {/*      */}
            {/*    }*/}
            {/*})}*/}
        </Card>
    );
};

export default OrdealBord;
