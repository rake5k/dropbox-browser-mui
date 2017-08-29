import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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

class SearchField extends Component {
    state = {
        value: null,
    };

    handleChange = event => {
        const debouncedSearch = _.debounce(
            this.props.onChange,
            700
        );
        debouncedSearch(event.target.value);
    };

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>
                <TextField
                    id="search"
                    InputProps={{ placeholder: 'Search files and folders...' }}
                    fullWidth
                    margin="normal"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

SearchField.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired, 
};

export default withStyles(styles)(SearchField);
