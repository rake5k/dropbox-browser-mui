import _ from 'lodash';
import { Drawer } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

import SearchField from './SearchField';

const styles = (theme: Theme) => ({
    searchField: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

interface SearchDrawerProps extends WithStyles<typeof styles> {
    readonly isOpen: boolean;
    readonly onSearch: (query: string) => void;
}

interface SearchDrawerState {
    open: boolean;
}

class SearchDrawer extends Component<SearchDrawerProps, SearchDrawerState> {
    constructor(props: SearchDrawerProps) {
        super(props);
        this.state = {
            open: props.isOpen,
        };
    }

    componentWillReceiveProps = (nextProps: SearchDrawerProps): void => {
        this.setState({ open: nextProps.isOpen });
    };

    handleSearch = (query: string): void => {
        this.debouncedSearch.cancel();
        if (query) {
            this.debouncedSearch(query);
        }
    };

    debouncedSearch: ((query: string) => void) & _.Cancelable = _.debounce(
        this.props.onSearch,
        700,
    );

    render = (): JSX.Element => (
        <Drawer anchor="bottom" open={this.state.open} variant="persistent">
            <div className={this.props.classes.searchField}>
                {this.state.open && (
                    <SearchField onChange={this.handleSearch} />
                )}
            </div>
        </Drawer>
    );
}

export default withStyles(styles)(SearchDrawer);
