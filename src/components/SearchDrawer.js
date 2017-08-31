import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import SearchField from './SearchField';

const styles = theme => ({
    searchField: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
});

function SearchDrawer(props) {
    const { classes, isOpen, onClose, onSearch } = props;

    return (
        <Drawer
            anchor="bottom"
            onRequestClose={onClose}
            open={isOpen}
            type="persistent"
        >
            <div className={classes.searchField}>
                <SearchField onChange={onSearch} />
            </div>
        </Drawer>
    );
}

SearchDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchDrawer);
