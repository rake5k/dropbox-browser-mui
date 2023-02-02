import _ from 'lodash-es';
import { Drawer } from '@mui/material';
import React from 'react';

import SearchField from 'components/SearchField';

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
    const searchFieldWrapperStyles = {
        paddingLeft: 16,
        paddingRight: 16,
    };

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
            <div style={searchFieldWrapperStyles}>
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
