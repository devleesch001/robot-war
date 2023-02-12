import React from 'react';
import { Card, Table } from 'antd';

const dataSource = [
    {
        Position: '1',
        Teams: 'ROBOT2',
        Fight: '5',
        Win: '5',
        Draw: '0',
        Loose: '0',
        Point: '20',
    },
];

const columns = [
    {
        title: 'Position',
        dataIndex: 'Position',
        key: 'Position',
    },
    {
        title: 'Teams',
        dataIndex: 'Teams',
        key: 'Teams',
    },
    {
        title: 'Fight',
        dataIndex: 'Fight',
        key: 'Fight',
    },
    {
        title: 'Win',
        dataIndex: 'Win',
        key: 'Win',
    },
    {
        title: 'Draw',
        dataIndex: 'Draw',
        key: 'Draw',
    },
    {
        title: 'Loose',
        dataIndex: 'Loose',
        key: 'Loose',
    },
    {
        title: 'Point',
        dataIndex: 'Point',
        key: 'Point',
    },
];

const RanckingCard: React.FC = (props) => {
    return (
        <Card title="Ranking" style={{ minWidth: 370 }} headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}>
            <Table columns={columns} dataSource={dataSource} />;
        </Card>
    );
};

export default RanckingCard;
