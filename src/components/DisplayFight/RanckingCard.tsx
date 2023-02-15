import React, { useEffect } from 'react';
import { Card, Table } from 'antd';
import { getBattle } from '../../api/BattleApi';

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
            <Table
                columns={columns}
                dataSource={() => {
                    columns.at(0);
                }}
            />
        </Card>
    );
};

export default RanckingCard;
