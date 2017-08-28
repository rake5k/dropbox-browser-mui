import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
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
    const { classes, onClick } = props;
    return (
        <Button
            fab
            color="primary"
            aria-label="search"
            className={classes.button}
            onClick={onClick}
        >    
            <SearchIcon />
        </Button>
    );
}

SearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchButton);
