import { WeekendTwoTone as EmptyIcon } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import EmptyState from 'components/EmptyState';
import EntryList from 'components/EntryList';
import Loader from 'components/Loader';
import SearchButton from 'components/SearchButton';
import * as Repository from 'repositories/Dropbox';
import { Entry } from 'types';
import { EntryType } from '../types';

export const context = 'browse';

export default function Browse() {
    const path = getBrowsePath(useLocation().pathname);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isApiSubscribed, setApiSubscribed] = useState(true);

    const handleEntriesLoaded = useCallback(
        (e: Entry[]): void => {
            if (!isApiSubscribed) {
                console.log(
                    'Browse: Api subscription was cancelled, doing nothing.',
                );
            } else {
                setEntries(e);
                setLoading(false);
            }
        },
        [isApiSubscribed],
    );

    const handleEntryTypeLoaded = useCallback(
        (type: EntryType | 'deleted') => {
            if (!isApiSubscribed) {
                console.log(
                    'Browse: Api subscription was cancelled, doing nothing.',
                );
            } else if (type !== 'folder') {
                console.log(
                    `Browse: Loaded entry type is ${type}, doing nothing.`,
                );
            } else {
                Repository.loadEntries(path).then(handleEntriesLoaded);
            }
        },
        [handleEntriesLoaded, isApiSubscribed, path],
    );

    const load = useCallback(() => {
        setApiSubscribed(true);
        setLoading(true);
        Repository.loadEntryType(path).then(handleEntryTypeLoaded);
    }, [path, handleEntryTypeLoaded]);

    useEffect(() => {
        console.log('Browse: Path has changed, loading data from api...');
        load();
    }, [load, path]);

    useEffect(() => {
        return () => {
            console.log('Browse: Clean-up: Cancelling api subscription.');
            setApiSubscribed(false);
        };
    }, [path]);

    const renderHead = (): JSX.Element => (
        <Helmet>
            <title>
                {path.split('/').pop() || 'Start'}
                {' - '}
                {process.env.REACT_APP_TITLE}
            </title>
        </Helmet>
    );

    const renderContent = (): JSX.Element => {
        if (isLoading) {
            return <Loader />;
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
            <SearchButton isActive={false} />
        </div>
    );
}

function getBrowsePath(path: string) {
    return decodeURIComponent(path.substring(context.length + 1));
}
