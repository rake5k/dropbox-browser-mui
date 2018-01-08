import _ from 'lodash';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SearchField from './SearchField';

const styles = theme => ({
    searchField: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

class SearchDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClosing: false,
            open: props.isOpen,
            value: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        const isClosing =
            this.props.isOpen === true && nextProps.isOpen === false;
        this.setState({
            value: isClosing ? '' : this.state.value,
            open: nextProps.isOpen,
        });
    }

    debouncedSearch = _.debounce(this.props.onSearch, 700);

    handleSearch = value => {
        this.setState({ value });
        this.debouncedSearch.cancel();
        this.debouncedSearch(value);
    };

    render = () => {
        return (
            <Drawer anchor="bottom" open={this.state.open} type="persistent">
                <div className={this.props.classes.searchField}>
                    <SearchField
                        onChange={this.handleSearch}
                        resetValue={this.state.isClosing}
                        value={this.state.value}
                    />
                </div>
            </Drawer>
        );
    };
}

SearchDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchDrawer);
