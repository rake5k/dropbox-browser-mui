import { withStyles, WithStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

const styles = {
    root: {
        color: '#cccccc',
        marginTop: `80px`,
        position: 'absolute' as 'absolute',
        textAlign: 'center' as 'center',
        width: '100%',
    },
    icon: {
        height: 128,
        width: 128,
    },
};

interface EmptyStateProps extends WithStyles<typeof styles> {
    readonly description: string;
    readonly Icon: React.ComponentType<SvgIconProps>;
}

function EmptyState(props: EmptyStateProps): JSX.Element {
    const { Icon } = props;
    return (
        <div className={props.classes.root}>
            <Icon className={props.classes.icon} />
            <div>{props.description}</div>
        </div>
    );
}

export default withStyles(styles)(EmptyState);
