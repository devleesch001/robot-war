import React from 'react';
import { Button } from 'antd';
import { yellow } from '@ant-design/colors';

interface LabelProps {
    color: string;
    href?: string;
    target?: string;
    style?: React.CSSProperties;
    borderColor?: string;
    win?: boolean;

    onClick?(): void;
}
const Label: React.FC<React.PropsWithChildren<LabelProps>> = (props) => {
    const { color, href, borderColor, target, win, children, onClick, style } = props;

    let appliedStyle: React.CSSProperties = { backgroundColor: color };

    if (style) {
        appliedStyle = { ...style, ...appliedStyle };
    }

    if (win === true) {
        appliedStyle.borderWidth = '2px';
        appliedStyle.borderStyle = 'solid';
        appliedStyle.borderColor = 'green';
    } else if (win === false) {
        appliedStyle.borderWidth = '2px';
        appliedStyle.border = '2px';
        appliedStyle.borderStyle = 'solid';
        appliedStyle.borderColor = 'red';
    }

    console.log(appliedStyle);
    return (
        <Button type="primary" style={appliedStyle} onClick={onClick} href={href} target={target}>
            {children}
        </Button>
    );
};
export default Label;
