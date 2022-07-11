import {
    SearchTwoTone as SearchEmptyIcon,
    WeekendTwoTone as EmptyIcon,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import EmptyState from '../components/EmptyState';
import EntryList from '../components/EntryList';
import Loader from '../components/Loader';
import SearchDrawer from '../components/SearchDrawer';
import SearchButton from '../components/SearchButton';
import * as Repository from '../repositories/Dropbox';
import * as types from '../types';
import SearchQuery from '../utils/SearchQuery';

export const context = 'search';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [entries, setEntries] = useState<types.Entry[]>([]);
    const [isLoading, setLoading] = useState(false);
    const searchQuery = new SearchQuery('q');

    useEffect(() => {
        load();
    }, [searchQuery.get(searchParams)]);

    const load = (): void => {
        if (!searchQuery.isEmpty(searchParams)) {
            setLoading(true);
            Repository.search(searchQuery.get(searchParams)).then(
                handleEntriesLoaded,
            );
        }
    };

    const handleEntriesLoaded = (e: types.Entry[]): void => {
        setEntries(e);
        setLoading(false);
    };

    const renderHead = (): JSX.Element => (
        <Helmet>
            <title>
                {searchQuery.get(searchParams) || 'Search'}
                {' - '}
                {process.env.REACT_APP_TITLE}
            </title>
        </Helmet>
    );

    const renderContent = (): JSX.Element => {
        if (isLoading) {
            return <Loader />;
        }

        if (searchQuery.isEmpty(searchParams)) {
            const description = 'Begin typing to start the search';
            return (
                <EmptyState description={description} Icon={SearchEmptyIcon} />
            );
        }

        if (!entries.length) {
            const description = 'No results here';
            return <EmptyState description={description} Icon={EmptyIcon} />;
        }

        return <EntryList entries={entries} />;
    };

    return (
        <div>
            {renderHead()}
            {renderContent()}
            <SearchButton isActive={true} />
            <SearchDrawer
                defaultValue={searchQuery.get(searchParams)}
                isOpen={true}
                onSearch={(q) => setSearchParams({ q }, { replace: true })}
            />
        </div>
    );
}
