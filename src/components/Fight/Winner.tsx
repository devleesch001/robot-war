import React from 'react';
import { BattleInterface, updateBattle } from '../../api/BattleApi';
import Label from '../Element/Label';
import { Row, Modal } from 'antd';
import { RobotInterface } from '../../api/RobotApi';

interface WinnerInterface {
    fight: BattleInterface;
}

const Winner: React.FC<WinnerInterface> = (props) => {
    const { fight } = props;

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [activeRobot, setActiveRobot] = React.useState<RobotInterface | null>(null);

    const showModal = (robot: RobotInterface) => {
        setActiveRobot(robot);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        if (fight._id && activeRobot && activeRobot._id) {
            updateBattle({ id: fight._id, win: activeRobot._id }).catch((r) => console.log(r));
        }
    };

    const handleCancel = () => {
        setActiveRobot(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            Select winner :
            <Row>
                {fight.fighters.map((fighter, index) => (
                    <div key={index}>
                        <Label onClick={() => showModal(fighter)} color={'red'}>
                            {fighter.name}
                        </Label>
                    </div>
                ))}
            </Row>
            {activeRobot && (
                <Modal title={activeRobot.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p style={{ fontSize: '20px' }}>Définir {activeRobot.name} comme gagnant de ce combat ?</p>
                </Modal>
            )}
        </div>
    );
};

export default Winner;
