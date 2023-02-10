import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { RobotInterface } from '../../../api/RobotApi';

import MediaPlayer from './MediaPlayer';

// interface TeamCardProps {
//     fighters: RobotInterface[];
// }

const { Title } = Typography;

// Rappeller du bareme de point
// 4/victoire
// 2/egaliter
// 2/bonus finaliste
// 0/defaite
function nbwins(id: string) {
    //Todo récuperer le nb de victoir
}

function nbDraw() {
    //Todo récuperer le nb d'egaliter
}

function nblooses() {
    //Todo récuperer lenb de defaite
}

const Card1vs1: React.FC = () => {
    // const { fighters } = props;

    return (
        <Card title="Stats" style={{ minWidth: 370 }} headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Title level={4}>{}</Title>
                    <p>Team: {}</p>
                    <p>Wins: {}</p>
                    <p>Draw: {}</p>
                    <p>Losses: {}</p>
                    <p>Rancking: {}</p>
                    <p>Score: {}</p>
                    <Divider type={'vertical'} dashed={false} />
                </Col>

                <Col span={12}>
                    <Title level={4}>{}</Title>
                    <p>Team: {}</p>
                    <p>Wins:{}</p>
                    <p>Draw: {}</p>
                    <p>Losses: {}</p>
                    <p>Rancking: {}</p>
                    <p>Score: {}</p>
                </Col>
            </Row>
        </Card>
    );
};
export default Card1vs1;
