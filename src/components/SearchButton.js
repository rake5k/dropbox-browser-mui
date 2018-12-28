import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Close, Search } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    button: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
});

function SearchButton(props) {
    const moveUp = props.isActive ? { bottom: 76 } : {};

    return (
        <Fab
            color="primary"
            aria-label="search"
            className={props.classes.button}
            component={props.component}
            style={moveUp}
            to={props.to}
        >
            {props.isActive ? <Close /> : <Search />}
        </Fab>
    );
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    to: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchButton);
