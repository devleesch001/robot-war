import React from 'react';
import { Row } from 'antd';
import { blue, yellow } from '@ant-design/colors';
import Label from './Label';
import { RobotInterface } from '../../api/RobotApi';
import { BattleInterface } from '../../api/BattleApi';
import { CrownFilled } from '@ant-design/icons';
function isWinner(fighter: RobotInterface, battle: BattleInterface) {
    return battle.win === undefined ? battle.win : battle.win?._id === fighter._id;
}

export enum WinPos {
    START = 'start',
    END = 'end',
    TWING = 'twing',
}
interface LabelRobotProps {
    fighter: RobotInterface;
    pos: WinPos;
    battle: BattleInterface;
    color: string;
}
const LabelRobot: React.FC<React.PropsWithChildren<LabelRobotProps>> = (props) => {
    const { fighter, battle, color, pos, children } = props;

    const win = isWinner(fighter, battle);

    const style: React.CSSProperties = { backgroundColor: color };

    if (win === true) {
        style.borderWidth = '2px';
        style.borderStyle = 'solid';
        style.borderColor = 'green';
    } else if (win === false) {
        style.borderWidth = '2px';
        style.border = '2px';
        style.borderStyle = 'solid';
        style.borderColor = 'red';
    }

    const winElment = win ? (
        fighter._id === battle.win?._id ? (
            <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5 }} />
        ) : (
            <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5, opacity: 0 }} />
        )
    ) : (
        <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5, opacity: 0 }} />
    );

    return (
        <Row>
            {pos === WinPos.START
                ? winElment
                : pos === WinPos.TWING && (
                      <CrownFilled style={{ color: yellow[5], fontSize: '20px', padding: 5, opacity: 0 }} />
                  )}
            <Label color={blue[5]} win={win}>
                {children}
            </Label>
            {(pos === WinPos.END || pos === WinPos.TWING) && winElment}
        </Row>
    );
};
export default LabelRobot;
