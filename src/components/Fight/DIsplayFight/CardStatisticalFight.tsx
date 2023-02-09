import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { RobotInterface } from '../../../api/RobotApi';

interface TeamCardProps {
    fighters: RobotInterface[];
}

const { Title } = Typography;

const TeamCard: React.FC<TeamCardProps> = (props) => {
    const { fighters } = props;

    return (
        <Card>
            <Row gutter={16}>
                <Col span={12}>
                    {fighters.map((fighter) => fighter._id)}
                    <Title level={4}>{}</Title>
                    <p>Wins: {}</p>
                    <p>Losses: {}</p>
                </Col>
                <Col span={12}>
                    <Title level={4}>{}</Title>
                    <p>Wins: {}</p>
                    <p>Losses: {}</p>
                </Col>
            </Row>
        </Card>
    );
};
export default TeamCard;
