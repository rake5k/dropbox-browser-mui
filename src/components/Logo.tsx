import { Avatar } from '@mui/material';
import React from 'react';

import logo from 'assets/logo.jpg';

export default function Logo() {
    const styles = {
        marginRight: 2,
    };
    return <Avatar alt="Logo" sx={styles} src={logo} />;
}
