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

import Viewer from './Viewer';

const styles = {
    appBar: {
        position: 'relative',
    },
};

class ViewerDialog extends Component {
    state = {
        open: false,
    };
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.fileLink) {
            this.handleOpen();
        }
    }

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes, fileLink, fileName } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    transition={<Slide direction="up" />}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit">
                                {fileName}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Viewer file={fileLink} />
                </Dialog>
            </div>
        );
    }
}

ViewerDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fileLink: PropTypes.string,
};

export default withStyles(styles)(ViewerDialog);
