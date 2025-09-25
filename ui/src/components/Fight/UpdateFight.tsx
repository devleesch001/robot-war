import * as React from 'react';
import { Card, Form, Input, Button, notification, Select, Row } from 'antd';
import { addRobot, getRobot, getRobots, RobotInterface } from '../../api/RobotApi';
import { useState } from 'react';
import { BattleInterface, getBattle, getBattles } from '../../api/BattleApi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
interface UpdateFightInterface {
    id: string;
    handleCancel(): void;
    handleOk(): void;
}
const UpdateFight: React.FC<UpdateFightInterface> = (props) => {
    const { id, handleCancel, handleOk } = props;

    const [form] = Form.useForm();
    console.log(form.getFieldsValue());

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

    const [battle, setBattle] = useState<BattleInterface | null>(null);

    React.useEffect(() => {
        getBattle(id)
            .then((battle) => {
                setBattle(battle);

                form.setFieldsValue(battle);
                form.setFieldValue(
                    'fighters',
                    battle.fighters.map((r) => r._id)
                );
            })
            .catch((err) => console.log(err));
    }, []);
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
            <Form
                form={form}
                name="new_combat_form_item"
                wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } }}
                onFinish={onFinish}
            >
                <Form.Item>
                    <Row
                        gutter={[18, 18]}
                        style={{ display: 'flex', textAlign: 'center', verticalAlign: 'middle', alignItems: 'center' }}
                        justify={'space-around'}
                    >
                        <Button type="primary" htmlType="submit" onClick={handleOk}>
                            Update
                        </Button>
                        <Button onClick={handleCancel} type={'primary'} danger key={'cancel'}>
                            Cancel
                        </Button>
                    </Row>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default UpdateFight;
