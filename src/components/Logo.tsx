import { Avatar } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';

import logo from '../logo.jpg';

const styles = {
    root: { marginRight: 16 },
};

function Logo(props: WithStyles<typeof styles>): JSX.Element {
    return <Avatar alt="Logo" className={props.classes.root} src={logo} />;
}

export default withStyles(styles)(Logo);
