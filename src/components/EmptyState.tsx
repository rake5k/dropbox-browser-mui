import { makeStyles } from '@mui/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';

const useStyles = makeStyles({
    root: {
        color: '#cccccc',
        marginTop: `80px`,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
});

interface Props {
    description: string;
    Icon: React.ComponentType<SvgIconProps>;
    children?: React.ReactNode;
}

export default function EmptyState({ description, Icon, children }: Props) {
    const classes = useStyles();
    const iconSize = 128;

    return (
        <div className={classes.root}>
            <Icon sx={{ height: iconSize, width: iconSize }} />
            <div>{description}</div>
            {children}
        </div>
    );
}
