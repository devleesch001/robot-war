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
            style={{ width: 300 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
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
                <Form.Item label={'validate'}>
                    <Button>Create Robot</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default CreateRobot;
