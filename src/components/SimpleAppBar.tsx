import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from 'components/Logo';

interface Props {
    title: string;
}

export default function SimpleAppBar(props: Props) {
    const styles: React.CSSProperties = {
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
    };

    return (
        <div style={styles}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Logo />
                    </Link>
                    <Typography variant="h6" color="inherit">
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
