import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function SearchField(props) {
    const { classes, onChange, value } = props;

    return (
        <div className={classes.container}>
            <TextField
                autoComplete="off"
                id="search"
                InputProps={{ placeholder: 'Search files and folders...' }}
                fullWidth
                margin="normal"
                onChange={handleChange(onChange)}
                value={value}
            />
        </div>
    );
}

SearchField.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    resetValue: PropTypes.bool,
};

export default withStyles(styles)(SearchField);

function handleChange(onChange) {
    return event => onChange(event.target.value);
}
