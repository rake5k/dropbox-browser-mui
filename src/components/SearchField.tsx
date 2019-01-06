import { TextField } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

interface SearchFieldProps extends WithStyles<typeof styles> {
    readonly onChange: (query: string) => void;
}

function SearchField(props: SearchFieldProps): JSX.Element {
    return (
        <div className={props.classes.root}>
            <TextField
                autoComplete="off"
                autoFocus
                id="search"
                inputProps={{ placeholder: 'Search files and folders...' }}
                fullWidth
                margin="normal"
                onChange={handleChange(props.onChange)}
            />
        </div>
    );
}

export default withStyles(styles)(SearchField);

function handleChange(onChange: (query: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>): void =>
        onChange(event.target.value);
}
