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
    defaultValue?: string;
}

export default function SearchDrawer({
    isOpen,
    onSearch,
    defaultValue,
}: Props) {
    const classes = useStyles();

    const handleSearch = (q: string): void => {
        debouncedSearch.cancel();
        if (q) {
            debouncedSearch(q);
        }
    };

    const debouncedSearch: _.DebouncedFunc<(query: string) => void> =
        _.debounce(onSearch, 700);

    return (
        <Drawer anchor="bottom" open={isOpen} variant="persistent">
            <div className={classes.searchField}>
                {isOpen && (
                    <SearchField
                        defaultValue={defaultValue}
                        onChange={handleSearch}
                    />
                )}
            </div>
        </Drawer>
    );
}
