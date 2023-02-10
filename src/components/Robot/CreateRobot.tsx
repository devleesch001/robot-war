import * as React from 'react';
import { Card, Form, Input, Button, notification } from 'antd';
import { addRobot } from '../../api/RobotApi';

const CreateRobot: React.FC = () => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        addRobot(values).then((r) => {
            notification.open({
                message: 'Robot Created',
            });
            form.resetFields();
        });
    };

    return (
        <Card
            title="Create Robot"
            bordered={false}
            style={{ minWidth: 280 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            <Form layout="horizontal" onFinish={onFinish} form={form}>
                <Form.Item label="name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input placeholder="Robot name" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Robot
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default CreateRobot;
