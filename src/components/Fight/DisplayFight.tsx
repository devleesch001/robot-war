import * as React from 'react';
import { Row, Col } from 'antd';
import MediaPlayer from './DIsplayFight/MediaPlayer';
import CardStatisticalFight from './DIsplayFight/CardStatisticalFight';
import RanckingCard from './DIsplayFight/RanckingCard';
const DisplayFight: React.FC = () => {
    return (
        <>
            <Row justify={'center'}>
                <Col span={8}>
                    <MediaPlayer mediaSrc={'https://youtu.be/mQRcaotzcGs'} />
                </Col>
            </Row>

            <Row justify={'center'}>
                <Col span={8}>
                    <CardStatisticalFight />
                </Col>
            </Row>
        </>
    );
};
export default DisplayFight;
