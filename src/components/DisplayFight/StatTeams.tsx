import React from 'react';
import { Row, Col, Divider, Typography } from 'antd';

import { RobotInterface } from '../../api/RobotApi';

// interface TeamCardProps {
//     fighters: RobotInterface[];
// }

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

const StatTeam: React.FC = () => {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Typography.Title level={4}>{}</Typography.Title>
                <p>Team: {}</p>
                <Divider />
                <p>Wins: {}</p>
                <Divider />
                <p>Draw: {}</p>
                <Divider />
                <p>Losses: {}</p>
                <Divider />
                <p>Rancking: {}</p>
                <Divider />
                <p>Score: {}</p>
            </Col>
        </Row>
    );
};
export default StatTeam;
