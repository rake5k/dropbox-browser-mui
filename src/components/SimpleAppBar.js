import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import BreadCrumbs from './BreadCrumbs';
import Logo from './Logo';

const styles = {
    root: {
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
    },
    flex: {
        flex: 1,
        whiteSpace: 'nowrap',
    },
};

function SimpleAppBar({ classes, location }) {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Typography
                        type="title"
                        color="inherit"
                        className={classes.flex}
                    >
                        {process.env.REACT_APP_TITLE}
                    </Typography>
                    <BreadCrumbs location={location.pathname} />
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
