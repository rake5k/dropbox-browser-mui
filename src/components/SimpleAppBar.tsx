import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from './Logo';

const styles = {
    root: {
        position: 'fixed' as 'fixed',
        width: '100%',
        zIndex: 1000,
    },
};

interface SimpleAppBarProps extends WithStyles<typeof styles> {
    readonly title?: string;
}

function SimpleAppBar(props: SimpleAppBarProps): JSX.Element {
    return (
        <div className={props.classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Typography variant="h6" color="inherit">
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(SimpleAppBar);
