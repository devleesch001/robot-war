import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Form, Select, notification } from 'antd';
import { getRobots, RobotInterface } from '../../api/RobotApi';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const CreateTournament: React.FC = () => {
    const [form] = Form.useForm();

    const [robots, setRobots] = React.useState<RobotInterface[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getRobots().then((robots) => {
                const selected = form.getFieldValue('fighters') ?? [];
                robots = robots.filter((robot) => !selected.includes(robot._id ?? ''));
                setRobots(robots);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
        notification.open({
            message: 'Tournament Created',
        });
    };

    return (
        <Card
            title="Create Tournament"
            bordered={false}
            style={{ minWidth: 280 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            <Form
                form={form}
                name="new_tournament_form_item"
                wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } }}
                onFinish={onFinish}
            >
                <Form.List
                    name="fighters"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 4) {
                                    return Promise.reject(new Error('minimum 4 teams to create tournament'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Teams' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input team's name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Select placeholder="Select Teams" allowClear style={{ width: '60%' }}>
                                            {robots.map((robot, index) => (
                                                <Select.Option value={robot._id} key={index}>
                                                    {robot.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '60%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Teams
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateTournament;
