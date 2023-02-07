import * as React from 'react';
import { Card, Form, Input, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const CreateRobot: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };
    //TODO API CREATEROBOT

    const [robot, setRobot] = useState('');
    const InputHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRobot(e.target.value);
        console.log(robot);
    };
    return (
        <Card
            title="Board Fights"
            bordered={false}
            style={{ minWidth: 280 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                //onChange={onFinish}
            >
                <Form.Item label="Name" valuePropName="fileList">
                    <Input placeholder="Robot name" style={{ width: '60%' }} onChange={InputHandle} />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Create Robot
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default CreateRobot;
