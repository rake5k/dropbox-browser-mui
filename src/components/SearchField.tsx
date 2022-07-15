import { SxProps, TextField, Theme } from '@mui/material';
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

    const rootStyles: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
    };

    const textFieldStyles: SxProps<Theme> = {
        marginLeft: (theme) => theme.spacing(1),
        marginRight: (theme) => theme.spacing(1),
        width: 200,
    };

    return (
        <div style={rootStyles}>
            <TextField
                autoComplete="off"
                autoFocus
                defaultValue={defaultValue}
                id="search"
                inputProps={{ placeholder: 'Search files and folders...' }}
                fullWidth
                margin="normal"
                onChange={handleChange(onChange)}
                sx={textFieldStyles}
                variant="standard"
            />
        </div>
    );
}
