import { Fab } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    left: 'auto',
    position: 'fixed',
};

interface Props {
    isActive: boolean;
}

export default function SearchButton({ isActive }: Props) {
    const navigate = useNavigate();
    const moveUp = isActive ? 76 : 20;

    const handleClick = () => navigate(isActive ? '/' : '/search');

    return (
        <Fab
            aria-label="search"
            color="primary"
            onClick={handleClick}
            sx={{ bottom: moveUp, ...fabStyle }}
        >
            {isActive ? <Close /> : <Search />}
        </Fab>
    );
}
