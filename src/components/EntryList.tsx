import { List } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Weekend as Empty } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import EmptyState from './EmptyState';
import Entry from './Entry';
import Loader from './Loader';
import SearchButton from './SearchButton';
import * as helpers from '../App.helpers';
import * as types from '../common/types';

export const context = 'browse';

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

export default function EntryList(): JSX.Element {
    const classes = useStyles();
    const path = getBrowsePath(useLocation().pathname);
    const [entries, setEntries] = useState<types.Entry[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, [path]);

    const load = (): void => {
        setLoading(true);
        helpers.loadEntryType(path).then((type) => {
            if (type === 'folder') {
                helpers.loadEntries(path).then(handleEntriesLoaded);
            }
        });
    };

    const handleEntriesLoaded = (e: types.Entry[]): void => {
        setEntries(e);
        setLoading(false);
    };

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
            <SearchButton isActive={false} />
        </div>
    );
}

function getBrowsePath(path: string) {
    return path.substring(context.length + 1);
}
