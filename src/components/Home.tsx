import React from 'react';
import { Col, Layout, Menu, Row, Typography } from 'antd';
const { Content } = Layout;
import FightBoard from './Fight/FightBoard';
import TournamentBoard from './Tournament/TournamentBoard';
import RobotsBoard from './Robot/RobotsBoard';

function Home() {
    return (
        <>
            <Menu
                style={{ justifyContent: 'center', backgroundColor: 'black' }}
                mode="horizontal"
                items={[
                    {
                        label: (
                            <Typography.Title level={1} style={{ color: 'white' }}>
                                Robot Wars
                            </Typography.Title>
                        ),
                        key: 'title',
                        disabled: true,
                        style: { cursor: 'default' },
                    },
                ]}
            />
            <Layout>
                <Content style={{ margin: 15 }}>
                    <Row gutter={[12, 12]} justify={'center'}>
                        <Col xs={24} md={24} xl={12} xxl={12}>
                            <FightBoard />
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
