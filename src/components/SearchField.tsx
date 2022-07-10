import { TextField } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing,
        marginRight: theme.spacing,
        width: 200,
    },
}));

interface SearchFieldProps {
    readonly onChange: (query: string) => void;
}

export default function SearchField(props: SearchFieldProps): JSX.Element {
    const classes = useStyles();
    return (
        <div className={classes.root}>
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

function handleChange(onChange: (query: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>): void =>
        onChange(event.target.value);
}
