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

function SearchDrawer(props: SearchDrawerProps): JSX.Element {
    const handleSearch = (query: string): void => {
        debouncedSearch.cancel();
        if (query) {
            debouncedSearch(query);
        }
    };

    const debouncedSearch: _.DebouncedFunc<(query: string) => void> =
        _.debounce(props.onSearch, 700);

    return (
        <Drawer anchor="bottom" open={props.isOpen} variant="persistent">
            <div className={props.classes.searchField}>
                {props.isOpen && <SearchField onChange={handleSearch} />}
            </div>
        </Drawer>
    );
}

export default withStyles(styles)(SearchDrawer);
