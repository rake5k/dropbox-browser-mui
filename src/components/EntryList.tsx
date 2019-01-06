import { Location } from 'history';
import _ from 'lodash';
import { List } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Weekend as Empty, Search as SearchEmpty } from '@material-ui/icons';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import EmptyState from './EmptyState';
import Entry from './Entry';
import Loader from './Loader';
import * as helpers from '../App.helpers';
import * as types from '../common/types';

const styles = (theme: Theme) => ({
    root: {
        background: theme.palette.background.paper,
        paddingBottom: 56,
        paddingTop: 80,
        width: '100%',
    },
});

interface EntryListProps extends WithStyles<typeof styles> {
    readonly location: Location;
}

interface EntryListState {
    entries: types.Entry[];
    isLoading: boolean;
}

class EntryList extends Component<EntryListProps, EntryListState> {
    isCancelled: boolean;

    constructor(props: EntryListProps) {
        super(props);
        this.isCancelled = false;
        this.state = {
            entries: [],
            isLoading: true,
        };
    }

    componentDidMount = (): void => {
        this.dispatchLoadingData(this.props);
    };

    componentWillReceiveProps = (nextProps: EntryListProps): void => {
        this.dispatchLoadingData(nextProps);
    };

    componentWillUnmount = (): void => {
        this.isCancelled = true;
    };

    dispatchLoadingData = (props: EntryListProps): void => {
        const params: URLSearchParams = new URLSearchParams(
            props.location.search,
        );
        if (this.isSearchActive(params) && !this.isSearchQueryEmpty(params)) {
            this.setState({ isLoading: true });
            this.search(this.getSearchQuery(params));
        } else if (!this.isSearchActive(params)) {
            this.setState({ isLoading: true });
            this.load(props.location.pathname);
        }
    };

    getSearchQuery = (params: URLSearchParams): string =>
        params.get('search') || '';

    isSearchActive = (params: URLSearchParams): boolean => params.has('search');

    isSearchQueryEmpty = (params: URLSearchParams): boolean =>
        _.isEmpty(this.getSearchQuery(params));

    load = (path: string): void => {
        helpers.loadEntryType(path).then(type => {
            if (type === 'folder') {
                helpers.loadEntries(path).then(this.setEntries);
            }
        });
    };

    search = (query: string): void => {
        helpers.search(query).then(this.setEntries);
    };

    setEntries = (entries: types.Entry[]): void => {
        if (!this.isCancelled) {
            this.setState({ entries, isLoading: false });
        }
    };

    render = (): JSX.Element => (
        <div>
            {this.renderHead()}
            {this.renderContent()}
        </div>
    );

    renderHead = (): JSX.Element => (
        <Helmet>
            <title>
                {this.props.location.pathname.split('/').pop() || 'Start'}
                {' - '}
                {process.env.REACT_APP_TITLE}
            </title>
        </Helmet>
    );

    renderContent = (): JSX.Element => {
        const params = new URLSearchParams(this.props.location.search);

        if (this.state.isLoading) {
            return <Loader />;
        }

        if (this.isSearchActive(params) && this.isSearchQueryEmpty(params)) {
            const description = 'Begin typing to start the search';
            return <EmptyState description={description} Icon={SearchEmpty} />;
        }

        if (!this.state.entries.length) {
            const description = 'No results here';
            return <EmptyState description={description} Icon={Empty} />;
        }

        return (
            <List className={this.props.classes.root}>
                {this.state.entries.map((entry, index) => (
                    <Entry {...entry} key={index} />
                ))}
            </List>
        );
    };
}

export default withStyles(styles)(EntryList);
