import { TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

interface Props {
    onChange: (query: string) => void;
    defaultValue?: string;
}

export default function SearchField({ onChange, defaultValue }: Props) {
    const classes = useStyles();

    const handleChange = (onChangeCb: (query: string) => void) => {
        return (event: React.ChangeEvent<HTMLInputElement>): void =>
            onChangeCb(event.target.value);
    };

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
                variant="standard"
            />
        </div>
    );
}
