import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

import Loader from './Loader';
import Viewer from './Viewer';
import * as helpers from '../App.helpers';

const styles = {
    appBar: {
        position: 'relative',
    },
};

class ViewerDialog extends Component {
    state = {
        fileLink: null,
        fileName: null,
        open: true,
    };

    componentDidMount() {
        const path = decodeURIComponent(this.props.location.search).split(
            'path=',
        )[1];
        helpers.loadFileLink(path).then(file => {
            this.setState({
                fileLink: file.link,
                fileName: file.metadata.name,
            });
        });
    }

    // handleRequestClose = () => {
    //     this.setState({
    //         fileLink: null,
    //         open: false,
    //     });
    // };

    render() {
        return (
            <Dialog
                fullScreen
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
                transition={<Slide direction="up" />}
            >
                <AppBar className={this.props.classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="contrast"
                            aria-label="Close"
                            href="/"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography type="title" color="inherit">
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
    }
}

ViewerDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fileLink: PropTypes.string,
    match: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewerDialog);
