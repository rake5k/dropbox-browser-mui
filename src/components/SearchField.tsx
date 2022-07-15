import { TextField } from '@mui/material';
import React from 'react';

interface Props {
    onChange: (query: string) => void;
    defaultValue?: string;
}

export default function SearchField({ onChange, defaultValue }: Props) {
    const handleChange = (onChangeCb: (query: string) => void) => {
        return (event: React.ChangeEvent<HTMLInputElement>): void =>
            onChangeCb(event.target.value);
    };

    return (
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
    );
}
