import React, { useState } from 'react';
import { Spin, Card } from 'antd';

interface Props {
    mediaSrc: string;
}

const MediaPlayer: React.FC<Props> = (props) => {
    const [loading, setLoading] = useState(false);
    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <Card
                title="Media Player"
                style={{ minWidth: 370 }}
                headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
            >
                <Spin spinning={loading}>
                    <video src={props.mediaSrc} onLoadedData={handleLoad} controls style={{ width: '100%' }} />
                </Spin>
            </Card>
        </>
    );
};
export default MediaPlayer;
