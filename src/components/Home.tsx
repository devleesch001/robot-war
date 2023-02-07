import React from 'react';
import { Col, Grid, Menu, Row, Typography } from 'antd';
import { red } from '@ant-design/colors';
function Home() {
    return (
        <>
            <Menu style={{ justifyContent: 'center', backgroundColor: red[5] }} mode="horizontal">
                <Typography.Title level={1}>Robot Wars</Typography.Title>
            </Menu>

            <Row justify={'center'}>
                <Col>
                    <p>main page</p>
                </Col>
            </Row>
        </>
    );
}

export default Home;
