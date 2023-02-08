import React from 'react';
import { Button } from 'antd';
import { yellow } from '@ant-design/colors';

interface LabelProps {
    color: string;
    borderColor?: string;
    win?: boolean;
}
const Label: React.FC<React.PropsWithChildren<LabelProps>> = (props) => {
    const { color, borderColor, win, children } = props;

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

    return (
        <Button type="primary" style={style}>
            <div style={{ position: 'absolute', left: '0px', top: '0px' }}></div>
            {children}
        </Button>
    );
};
export default Label;
