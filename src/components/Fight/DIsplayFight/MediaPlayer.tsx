import React, { useState } from 'react';
import { Modal, Button, Spin } from 'antd';

interface Props {
    mediaSrc: string;
}

const MediaPlayer: React.FC<Props> = (props) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
        setLoading(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Play Media
            </Button>
            <Modal title="Media Player" visible={visible} onCancel={handleCancel} footer={null}>
                <Spin spinning={loading}>
                    <video src={props.mediaSrc} onLoadedData={handleLoad} controls style={{ width: '100%' }} />
                </Spin>
            </Modal>
        </>
    );
};
export default MediaPlayer;
