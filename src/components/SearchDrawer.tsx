import _ from 'lodash';
import { Drawer, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import SearchField from 'components/SearchField';

const useStyles = makeStyles((theme: Theme) => ({
    searchField: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
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
