import _ from 'lodash';
import { List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Weekend as Empty, Search as SearchEmpty } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import EmptyState from './EmptyState';
import Entry from './Entry';
import Loader from './Loader';
import * as helpers from '../App.helpers';

const styles = theme => ({
    root: {
        background: theme.palette.background.paper,
        paddingBottom: 56,
        paddingTop: 80,
        width: '100%',
    },
    emptyState: {
        marginTop: 80,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
});

class EntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: null,
        };
    }

    componentDidMount() {
        this.dispatchLoadingData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.dispatchLoadingData(nextProps);
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    dispatchLoadingData(props) {
        const params = props.location.search;
        if (this.isSearchActive(params) && !this.isSearchQueryEmpty(params)) {
            this.setEntries(null);
            this.search(this.getSearchQuery(params));
        } else if (!this.isSearchActive(params)) {
            this.setEntries(null);
            this.load(props.location.pathname);
        }
    }

    getSearchQuery = params => new URLSearchParams(params).get('search');

    isSearchActive = params => new URLSearchParams(params).has('search');

    isSearchQueryEmpty = params =>
        _.isEmpty(new URLSearchParams(params).get('search'));

    load = path => {
        helpers.loadFileMetadata(path).then(metadata => {
            if (metadata['.tag'] === 'folder') {
                helpers.loadEntries(path).then(this.setEntries);
            }
        });
    };

    search = query => {
        helpers.searchFiles(query).then(this.setEntries);
    };

    setEntries = entries => {
        if (!this.isCancelled) {
            this.setState({ entries });
        }
    };

    render = () => {
        return (
            <div>
                {this.renderHead()}
                {this.renderContent()}
            </div>
        );
    };

    renderHead = () => (
        <Helmet>
            <title>
                {this.props.location.pathname.split('/').pop() || 'Start'}
                {' - '}
                {process.env.REACT_APP_TITLE}
            </title>
        </Helmet>
    );

    renderContent = () => {
        const params = this.props.location.search;

        if (this.isSearchActive(params) && this.isSearchQueryEmpty(params)) {
            const description = 'Begin typing to start the search';
            return <EmptyState description={description} Icon={SearchEmpty} />;
        }

        if (!this.state.entries) {
            return <Loader />;
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

EntryList.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntryList);
