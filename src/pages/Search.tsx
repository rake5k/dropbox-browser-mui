import {
    SearchTwoTone as SearchEmptyIcon,
    WeekendTwoTone as EmptyIcon,
} from '@mui/icons-material';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
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
    const query = new SearchQuery('q').get(searchParams);

    const load = useCallback(() => {
        if (!_.isEmpty(query)) {
            setLoading(true);
            Repository.search(query).then(handleEntriesLoaded);
        }
    }, [query]);

    useEffect(() => {
        load();
    }, [load]);

    const handleEntriesLoaded = (e: types.Entry[]): void => {
        setEntries(e);
        setLoading(false);
    };

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
        if (isLoading) {
            return <Loader />;
        }

        if (_.isEmpty(query)) {
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
                defaultValue={query}
                isOpen={true}
                onSearch={(q) => setSearchParams({ q }, { replace: true })}
            />
        </div>
    );
}
