import React from 'react';
import { Col, Grid, Layout, Menu, Row, Typography } from 'antd';
import test from '../test.png';

const { Header, Footer, Sider, Content } = Layout;

import { red } from '@ant-design/colors';
import CardCombatBoard from './BattleBoard/CardCombatBoard';
import CreateTournament from './GameMode/Tournament/CreateTournament';
import CreateRobot from './Robot/CreateRobot';

const Admin = () => {
    return (
        <>
            <Menu
                style={{ justifyContent: 'center', backgroundColor: red[5] }}
                mode="horizontal"
                items={[
                    {
                        label: <Typography.Title level={1}>Robot Wars</Typography.Title>,
                        key: 'mail',
                        disabled: true,
                        style: { cursor: 'default' },
                    },
                    {
                        className: 'hider',
                        label: <img src={test}></img>,
                        key: 'test',
                        disabled: true,
                        style: { cursor: 'default' },
                    },
                ]}
            />

            <Layout>
                <Content style={{ margin: 15 }}>
                    <Row gutter={[12, 12]} justify={'center'}>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <CreateRobot />
                        </Col>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <CreateTournament />
                        </Col>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <CreateRobot />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default Admin;
