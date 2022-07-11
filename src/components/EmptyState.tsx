import { makeStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

const useStyles = makeStyles({
    root: {
        color: '#cccccc',
        marginTop: `80px`,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
    icon: {
        height: 128,
        width: 128,
    },
});

interface Props {
    description: string;
    Icon: React.ComponentType<SvgIconProps>;
    children?: React.ReactNode;
}

export default function EmptyState({ description, Icon, children }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Icon className={classes.icon} />
            <div>{description}</div>
            {children}
        </div>
    );
}
