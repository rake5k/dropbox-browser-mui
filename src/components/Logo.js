import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import logo from '../logo.jpg';

const styles = {
    root: {
        marginRight: 18,
        width: 30,
    },
};

function Logo({ classes }) {
    return <img alt="Logo" className={classes.root} src={logo} />;
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logo);
