import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Form, Select } from 'antd';

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

const combats = [
    { id: 1, fighter: ['equipe1', 'equipe2'] }, //pour plus tard ajouter une images du robot
    { id: 2, fighter: ['equipe4', 'equipe3'] },
    { id: 3, fighter: ['equipe1', 'equipe3'] },
    { id: 4, fighter: ['equipe4', 'equipe2'] },
];
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const CreateTournament: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };
    //TODO charger le select avec toutes les equipes disponible Bracket

    const [teams, setTeams] = useState('');
    const selectHandle = () => {
        console.log('ok');
    };
    const CreateTournamentHandle = () => {
        //TODO recuperer les equipe selectionner pour le tournoi
        //TODO API TOURNOI POUR ENVOIE LINFO DU TOUNOI
        //TODO CREATION DU TOURNOI AVEC LA BIBLIOTHECH TOURNOI
    };

    return (
        <Card
            title="Create Tournament"
            bordered={false}
            style={{ minWidth: 280 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            <Form
                name="New_Tounament_form_item"
                wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } }}
                onFinish={onFinish}
            >
                <Form.List
                    name="names"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 4) {
                                    return Promise.reject(new Error('minimun 4 teams to create tournament'));
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
                                        <Select
                                            placeholder="Select Teams"
                                            onClick={selectHandle}
                                            allowClear
                                            style={{ width: '80%' }}
                                        >
                                            {combats.map((combat) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <Option value="male">{combat.fighter.at(0)}</Option>
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
                    <Button type="primary" htmlType="submit" onClick={CreateTournamentHandle}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateTournament;
