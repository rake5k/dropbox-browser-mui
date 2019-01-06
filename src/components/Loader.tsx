import { CircularProgress } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = {
    root: {
        left: 0,
        margin: `80px auto`,
        position: 'absolute' as 'absolute',
        right: 0,
    },
};

function Loader(props: WithStyles<typeof styles>): JSX.Element {
    return <CircularProgress className={props.classes.root} />;
}

export default withStyles(styles)(Loader);
