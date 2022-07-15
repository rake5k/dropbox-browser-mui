import { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';

interface Props {
    description: string;
    Icon: React.ComponentType<SvgIconProps>;
    children?: React.ReactNode;
}

export default function EmptyState({ description, Icon, children }: Props) {
    const rootStyles: React.CSSProperties = {
        color: '#cccccc',
        marginTop: `80px`,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    };
    const iconStyles = {
        height: 128,
        width: 128,
    };

    return (
        <div style={rootStyles}>
            <Icon sx={iconStyles} />
            <div>{description}</div>
            {children}
        </div>
    );
}
