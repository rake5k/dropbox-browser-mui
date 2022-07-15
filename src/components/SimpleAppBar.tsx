import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from 'components/Logo';

interface Props {
    title: string;
}

export default function SimpleAppBar(props: Props) {
    const styles = {
        position: 'fixed',
        width: '100%',
        zIndex: 'modal',
    };

    return (
        <AppBar position="static" sx={styles}>
            <Toolbar>
                <Link to="/">
                    <Logo />
                </Link>
                <Typography variant="h6" color="inherit">
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
