import React from 'react';
import { Col, Grid, Layout, Menu, Row, Typography } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import { red } from '@ant-design/colors';
import CardCombatBoard from './BattleBoard/CardCombatBoard';
import GridBattleBoard from './BattleBoard/GridBattleBoard';
function Home() {
    return (
        <>
            <Header>
                <Menu style={{ justifyContent: 'center', backgroundColor: red[5] }} mode="horizontal">
                    <Typography.Title level={1}>Robot Wars</Typography.Title>
                </Menu>
            </Header>
            {/*<Header style={headerStyle}>Header</Header>*/}
            <Layout>
                <Content>
                    <Row gutter={[12, 12]} justify={'center'}>
                        <Col span={6}>
                            <GridBattleBoard />
                        </Col>
                        {/*<Col span={6}>*/}
                        {/*    <CardCombatBoard />*/}
                        {/*</Col>*/}
                    </Row>
                </Content>
            </Layout>
            {/*<Footer style={footerStyle}>Footer</Footer>*/}
        </>
    );
}

export default Home;
