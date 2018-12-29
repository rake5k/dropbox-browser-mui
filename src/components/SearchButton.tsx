import { Fab } from '@material-ui/core';
import { FabProps } from '@material-ui/core/Fab';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Close, Search } from '@material-ui/icons';
import React from 'react';

const styles = {
    button: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed' as 'fixed',
    },
};

interface SearchButtonProps extends WithStyles<typeof styles> {
    readonly component: React.ReactType<FabProps>;
    readonly isActive: boolean;
}

function SearchButton(props: SearchButtonProps): JSX.Element {
    const moveUp = props.isActive ? { bottom: 76 } : {};

    return (
        <Fab
            color="primary"
            aria-label="search"
            className={props.classes.button}
            component={props.component}
            style={moveUp}
        >
            {props.isActive ? <Close /> : <Search />}
        </Fab>
    );
}

export default withStyles(styles)(SearchButton);
