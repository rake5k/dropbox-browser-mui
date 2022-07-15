import {
    SearchTwoTone as SearchEmptyIcon,
    WeekendTwoTone as EmptyIcon,
} from '@mui/icons-material';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import EmptyState from 'components/EmptyState';
import EntryList from 'components/EntryList';
import Loader from 'components/Loader';
import SearchDrawer from 'components/SearchDrawer';
import SearchButton from 'components/SearchButton';
import * as Repository from 'repositories/Dropbox';
import { Entry } from 'types';
import SearchQuery from 'utils/SearchQuery';

export const context = 'search';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = new SearchQuery('q').get(searchParams);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isApiSubscribed, setApiSubscribed] = useState(true);

    const handleEntriesLoaded = useCallback(
        (e: Entry[]): void => {
            if (!isApiSubscribed) {
                console.log(
                    `Search: Api subscription was cancelled, doing nothing.`,
                );
            } else {
                setEntries(e);
                setLoading(false);
            }
        },
        [isApiSubscribed],
    );

    const load = useCallback(() => {
        if (_.isEmpty(query)) {
            console.log('Search: Query is empty, doing nothing.');
        } else {
            setApiSubscribed(true);
            setLoading(true);
            Repository.search(query).then(handleEntriesLoaded);
        }
    }, [query, handleEntriesLoaded]);

    useEffect(() => {
        console.log('Search: Query has changed, loading data from api...');
        load();
        return () => {
            setApiSubscribed(false);
        };
    }, [load, query]);

    useEffect(() => {
        return () => {
            console.log('Search: Clean-up: Cancelling api subscription.');
            setApiSubscribed(false);
        };
    }, [query]);

    const renderHead = (): JSX.Element => (
        <Helmet>
            <title>
                {query || 'Search'}
                {' - '}
                {process.env.REACT_APP_TITLE}
            </title>
        </Helmet>
    );

    const renderContent = (): JSX.Element => {
        if (_.isEmpty(query)) {
            const description = 'Begin typing to start the search';
            return (
                <EmptyState description={description} Icon={SearchEmptyIcon} />
            );
        }

        if (_.isEmpty(query)) {
            const description = 'Begin typing to start the search';
            return (
                <EmptyState description={description} Icon={SearchEmptyIcon} />
            );
        }
        if (isLoading) {
            return <Loader />;
        }

        if (!entries.length) {
            const description = 'No results here';
            return <EmptyState description={description} Icon={EmptyIcon} />;
        }

        return <EntryList entries={entries} sx={{ paddingBottom: 7 }} />;
    };

    return (
        <>
            {renderHead()}
            {renderContent()}
            <SearchButton isActive={true} />
            <SearchDrawer
                defaultValue={query}
                isOpen={true}
                onSearch={(q) => setSearchParams({ q }, { replace: true })}
            />
        </>
    );
}
