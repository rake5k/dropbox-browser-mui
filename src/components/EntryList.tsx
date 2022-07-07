import { List } from '@material-ui/core';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { Weekend as Empty, Search as SearchEmpty } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import EmptyState from './EmptyState';
import Entry from './Entry';
import Loader from './Loader';
import * as helpers from '../App.helpers';
import * as types from '../common/types';
import {
    getSearchQuery,
    isSearchActive,
    isSearchQueryEmpty,
} from './EntryList.helpers';

const styles = (theme: Theme) => ({
    root: {
        background: theme.palette.background.paper,
        paddingBottom: 56,
        paddingTop: 80,
        width: '100%',
    },
});

interface EntryListProps extends WithStyles<typeof styles> {}

function EntryList(props: EntryListProps): JSX.Element {
    const location = useLocation();
    const path = location.pathname;
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const [entries, setEntries] = useState<types.Entry[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        dispatchLoadingData();
    }, [path]);

    useEffect(() => {
        dispatchSearch();
    }, [location.search]);

    const dispatchLoadingData = (): void => {
        setLoading(true);
        helpers.loadEntryType(path).then((type) => {
            if (type === 'folder') {
                helpers.loadEntries(path).then(handleEntriesLoaded);
            }
        });
    };

    const dispatchSearch = (): void => {
        if (isSearchActive(searchParams) && !isSearchQueryEmpty(searchParams)) {
            setLoading(true);
            helpers
                .search(getSearchQuery(searchParams))
                .then(handleEntriesLoaded);
        } else if (!isSearchActive(searchParams)) {
            dispatchLoadingData();
        }
    };

    const handleEntriesLoaded = (e: types.Entry[]): void => {
        setEntries(e);
        setLoading(false);
    };

    const renderHead = (): JSX.Element => (
        <Helmet>
            <title>
                {location.pathname.split('/').pop() || 'Start'}
                {' - '}
                {process.env.REACT_APP_TITLE}
            </title>
        </Helmet>
    );

    const renderContent = (): JSX.Element => {
        if (isLoading) {
            return <Loader />;
        }

        if (isSearchActive(searchParams) && isSearchQueryEmpty(searchParams)) {
            const description = 'Begin typing to start the search';
            return <EmptyState description={description} Icon={SearchEmpty} />;
        }

        if (!entries.length) {
            const description = 'No results here';
            return <EmptyState description={description} Icon={Empty} />;
        }

        return (
            <List className={props.classes.root}>
                {entries.map((entry, index) => (
                    <Entry {...entry} key={index} />
                ))}
            </List>
        );
    };

    return (
        <div>
            {renderHead()}
            {renderContent()}
        </div>
    );
}

export default withStyles(styles)(EntryList);
