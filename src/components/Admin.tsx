import React from 'react';
import { Col, Layout, Menu, Row, Typography } from 'antd';
import test from '../test.png';

const { Content } = Layout;

import { red } from '@ant-design/colors';
import CreateTournament from './Tournament/CreateTournament';
import CreateRobot from './Robot/CreateRobot';
import CreateFight from './Fight/CreateFight';
import FightBoard from './Fight/FightBoard';
import TournamentList from './Tournament/TournamentList';
import RobotsBoard from './Robot/RobotsBoard';

const Admin = () => {
    return (
        <>
            <Menu
                style={{ justifyContent: 'center', backgroundColor: red[5] }}
                mode="horizontal"
                items={[
                    {
                        className: 'hider',
                        label: <img src={test}></img>,
                        key: '1',
                        disabled: true,
                        style: { cursor: 'default' },
                    },
                    {
                        label: <Typography.Title level={1}>Robot Wars</Typography.Title>,
                        key: 'mail',
                        disabled: true,
                        style: { cursor: 'default' },
                    },
                    {
                        className: 'hider',
                        label: <img src={test}></img>,
                        key: '2',
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
                            <CreateFight />
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <Layout>
                <Content style={{ margin: 15 }}>
                    <Row gutter={[12, 12]} justify={'center'}>
                        <Col xs={24} md={24} xl={12} xxl={12}>
                            <FightBoard isAdmin={true} />
                        </Col>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <TournamentList isAdmin={true} />
                        </Col>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <RobotsBoard />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default Admin;
