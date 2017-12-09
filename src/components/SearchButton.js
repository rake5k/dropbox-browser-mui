import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import CloseIcon from 'material-ui-icons/Close';
import SearchIcon from 'material-ui-icons/Search';
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
        <Button
            fab
            color="primary"
            aria-label="search"
            className={props.classes.button}
            component={props.component}
            style={moveUp}
            to={props.to}
        >
            {props.isActive ? <CloseIcon /> : <SearchIcon />}
        </Button>
    );
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
    component: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    to: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchButton);
