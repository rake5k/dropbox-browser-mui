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

interface EmptyStateProps {
    readonly description: string;
    readonly Icon: React.ComponentType<SvgIconProps>;
}

export default function EmptyState(props: EmptyStateProps): JSX.Element {
    const classes = useStyles();
    const { Icon } = props;

    return (
        <div className={classes.root}>
            <Icon className={classes.icon} />
            <div>{props.description}</div>
        </div>
    );
}
