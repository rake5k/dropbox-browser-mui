import { Avatar, SxProps, Theme } from '@mui/material';
import React from 'react';

import logo from 'assets/logo.jpg';

export default function Logo() {
    const styles: SxProps<Theme> = {
        marginRight: (theme) => theme.spacing(2),
    };
    return <Avatar alt="Logo" sx={styles} src={logo} />;
}
