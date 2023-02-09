import React from 'react';
import { Card, List, Typography } from 'antd';

interface Team {
    name: string;
    wins: number;
    losses: number;
}

interface Props {
    teams: Team[];
}

const { Title } = Typography;

const RanckingCard: React.FC<Props> = (props) => {
    return (
        <Card>
            <Title level={3}>Standings</Title>
            <List
                dataSource={props.teams}
                renderItem={(team) => (
                    <List.Item>
                        <Typography.Text strong>{team.name}</Typography.Text>
                        <Typography.Text type="secondary">
                            Wins: {team.wins} Losses: {team.losses}
                        </Typography.Text>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default RanckingCard;
