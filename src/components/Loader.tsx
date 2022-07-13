import { CircularProgress } from '@mui/material';
import React from 'react';

export default function Loader() {
    const styles = {
        left: 0,
        margin: `80px auto`,
        position: 'absolute',
        right: 0,
    };

    return <CircularProgress sx={styles} />;
}
