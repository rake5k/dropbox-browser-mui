import { List } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Search as SearchEmpty, Weekend as Empty } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import Entry from './Entry';
import EmptyState from './EmptyState';
import Loader from './Loader';
import { getSearchQuery, isSearchQueryEmpty } from './Search.helpers';
import SearchButton from './SearchButton';
import SearchDrawer from './SearchDrawer';
import * as helpers from '../App.helpers';
import * as types from '../common/types';

export const context = 'search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.background.paper,
            paddingBottom: 56,
            paddingTop: 80,
            width: '100%',
        },
    }),
);

export default function Search(): JSX.Element {
    const classes = useStyles();
    const [searchParams, setSearchParams] = useSearchParams();
    const [entries, setEntries] = useState<types.Entry[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, [getSearchQuery(searchParams)]);

    const load = (): void => {
        if (!isSearchQueryEmpty(searchParams)) {
            setLoading(true);
            helpers
                .search(getSearchQuery(searchParams))
                .then(handleEntriesLoaded);
        }
    };

    const handleEntriesLoaded = (e: types.Entry[]): void => {
        setEntries(e);
        setLoading(false);
    };

    const renderHead = (): JSX.Element => (
        <Helmet>
            <title>
                {getSearchQuery(searchParams) || 'Search'}
                {' - '}
                {process.env.REACT_APP_TITLE}
            </title>
        </Helmet>
    );

    const renderContent = (): JSX.Element => {
        if (isLoading) {
            return <Loader />;
        }

        if (isSearchQueryEmpty(searchParams)) {
            const description = 'Begin typing to start the search';
            return <EmptyState description={description} Icon={SearchEmpty} />;
        }

        if (!entries.length) {
            const description = 'No results here';
            return <EmptyState description={description} Icon={Empty} />;
        }

        return (
            <List className={classes.root}>
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
            <SearchButton isActive={true} />
            <SearchDrawer
                isOpen={true}
                onSearch={(q) => setSearchParams({ q }, { replace: true })}
            />
        </div>
    );
}
