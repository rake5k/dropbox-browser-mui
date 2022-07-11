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

interface Props {
    onChange: (query: string) => void;
    defaultValue?: string;
}

export default function SearchField({ onChange, defaultValue }: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField
                autoComplete="off"
                autoFocus
                defaultValue={defaultValue}
                id="search"
                inputProps={{ placeholder: 'Search files and folders...' }}
                fullWidth
                margin="normal"
                onChange={handleChange(onChange)}
            />
        </div>
    );
}

function handleChange(onChange: (query: string) => void) {
    return (event: React.ChangeEvent<HTMLInputElement>): void =>
        onChange(event.target.value);
}
