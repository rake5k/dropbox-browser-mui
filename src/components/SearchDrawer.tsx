import _ from 'lodash';
import { Drawer } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import SearchField from './SearchField';

const useStyles = makeStyles((theme: Theme) => ({
    searchField: {
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
    },
}));

interface Props {
    isOpen: boolean;
    onSearch: (query: string) => void;
}

export default function SearchDrawer(props: Props) {
    const classes = useStyles();

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
            <div className={classes.searchField}>
                {props.isOpen && <SearchField onChange={handleSearch} />}
            </div>
        </Drawer>
    );
}
