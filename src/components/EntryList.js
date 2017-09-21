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
        helpers
            .loadEntries(
                this.props.match.params.path
                    ? `/${this.props.match.params.path}`
                    : '',
            )
            .then(entries => this.setState({ entries }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.path !== prevState.path ||
            (!this.state.isSearching && prevState.isSearching)
        ) {
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
                {this.state.entries.map((entry, index) => {
                    entry.path =
                        entry.type === 'file'
                            ? `/view?path=${entry.path}`
                            : `/browse${entry.path}`;
                    return <Entry {...entry} key={index} />;
                })}
            </List>
        );
    }
}

export default withStyles(styles)(EntryList);
