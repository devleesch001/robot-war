import React from 'react';
import { Col, Layout, Menu, Row, Typography } from 'antd';
import test from '../test.png';

const { Content } = Layout;

import { blue } from '@ant-design/colors';
import CombatBoard from './Combat/CombatBoard';
import TournamentBoard from './Tournament/TournamentBoard';
import RobotsBoard from './Robot/RobotsBoard';

function Home() {
    return (
        <>
            <Menu
                style={{ justifyContent: 'center', backgroundColor: blue[5] }}
                mode="horizontal"
                items={[
                    {
                        label: (
                            <Typography.Title level={1} style={{ color: 'white' }}>
                                Robot Wars
                            </Typography.Title>
                        ),
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
            {/*<Header style={headerStyle}>Header</Header>*/}
            <Layout>
                <Content style={{ margin: 15 }}>
                    <Row gutter={[12, 12]} justify={'center'}>
                        <Col xs={24} md={12} xl={12} xxl={8}>
                            <CombatBoard />
                        </Col>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <TournamentBoard />
                        </Col>
                        <Col xs={24} md={12} xl={8} xxl={6}>
                            <RobotsBoard />
                        </Col>
                    </Row>
                </Content>
            </Layout>
            {/*<Footer style={footerStyle}>Footer</Footer>*/}
        </>
    );
}

export default Home;
