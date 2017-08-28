import Drawer from 'material-ui/Drawer';
import InboxIcon from 'material-ui-icons/Inbox';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
    listFull: {
        width: 'auto',
        flex: 'initial',
    },
};

function SearchDrawer(props) {
    const { classes, isOpen, onClose } = props;

    const mailFolderListItems = (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItem>
        </div>
    );

    const fullList = (
        <div>
            <List className={classes.listFull} disablePadding>
                {mailFolderListItems}
            </List>
        </div>
    );

    return (
        <Drawer
            anchor="bottom"
            onRequestClose={onClose}
            open={isOpen}
        >
            {fullList}
        </Drawer>
    );
}

SearchDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
};

export default withStyles(styles)(SearchDrawer);
