import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    state = {
        entries: null,
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const path = this.props.location.pathname;
        helpers.loadFileMetadata(path).then(metadata => {
            if (metadata['.tag'] === 'folder') {
                helpers
                    .loadEntries(path)
                    .then(entries => this.setState({ entries }));
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const path = nextProps.location.pathname;
        helpers.loadFileMetadata(path).then(metadata => {
            if (metadata['.tag'] === 'folder') {
                helpers
                    .loadEntries(path)
                    .then(entries => this.setState({ entries }));
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.isSearching && prevState.isSearching) {
            helpers
                .loadEntries(`/${this.props.match.params.path}`)
                .then(entries => this.setState({ entries }));
        }
    }

    render() {
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
    }
}

export default withStyles(styles)(EntryList);
