import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import Viewer from './Viewer';
import * as helpers from '../App.helpers';

const initialState = {
    fileLink: null,
    fileName: null,
    open: false,
};

const styles = {
    appBar: {
        position: 'relative',
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ViewerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.load(this.props.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        this.load(nextProps.location.pathname);
    }

    handleClose = () => {
        this.resetState();
    };

    load = path => {
        helpers.loadFileMetadata(path).then(metadata => {
            if (metadata['.tag'] === 'file') {
                this.open();
                helpers.loadFileLink(path).then(file => {
                    this.setState({
                        fileLink: file.link,
                        fileName: file.metadata.name,
                    });
                });
            } else {
                this.resetState();
            }
        });
    };

    open() {
        if (!this.state.open) {
            this.setState({ open: true });
        }
    }

    resetState = () => {
        this.setState(initialState);
    };

    render = () => {
        const splitPath = this.props.location.pathname.split('/');
        splitPath.pop();
        const parentPath = splitPath.join('/');

        return (
            <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                transition={Transition}
            >
                <AppBar className={this.props.classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Close"
                            component={Link}
                            onClick={this.handleClose}
                            to={parentPath}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            {this.state.fileName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {this.state.fileLink ? (
                    <Viewer file={this.state.fileLink} />
                ) : (
                    <Loader />
                )}
            </Dialog>
        );
    };
}

ViewerDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewerDialog);
