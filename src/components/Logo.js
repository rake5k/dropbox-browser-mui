import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import logo from '../logo.jpg';

const styles = {
    root: {
        marginRight: 16,
    },
};

function Logo({ classes }) {
    return <Avatar alt="VSLK-Logo" className={classes.root} src={logo} />;
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logo);
