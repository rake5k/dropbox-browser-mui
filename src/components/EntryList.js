import _ from 'lodash';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

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

    dispatchLoadingData(props) {
        const params = props.location.search;
        if (this.isSearchActive(params) && !this.isSearchQueryEmpty(params)) {
            this.search(this.getSearchQuery(params));
        } else if (!this.isSearchActive(params)) {
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
                helpers
                    .loadEntries(path)
                    .then(entries => this.setState({ entries }));
            }
        });
    };

    search = query => {
        helpers.searchFiles(query).then(entries => this.setState({ entries }));
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
            return (
                <div style={{ top: '100px' }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />Search...
                </div>
            );
        }

        if (!this.state.entries) {
            return <Loader />;
        }

        if (!this.state.entries.length) {
            return <p className={this.props.classes.emptyState}>...empty</p>;
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
