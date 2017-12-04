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
    constructor(props) {
        super(props);
        this.state = {
            entries: null,
        };
    }

    componentDidMount() {
        this.load(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        this.load(nextProps.location.pathname);
    }

    load = path => {
        helpers.loadFileMetadata(path).then(metadata => {
            if (metadata['.tag'] === 'folder') {
                helpers
                    .loadEntries(path)
                    .then(entries => this.setState({ entries }));
            }
        });
    };

    render = () => {
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
    match: PropTypes.object.isRequired,
};

export default withStyles(styles)(EntryList);
