import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

import Logo from './Logo';

const styles = {
    root: {
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
    },
};

function SimpleAppBar({ classes, title }) {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Typography type="title" color="inherit">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
