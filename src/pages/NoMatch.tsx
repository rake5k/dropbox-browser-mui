import { CancelPresentationTwoTone as NoMatchIcon } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

import EmptyState from '../components/EmptyState';

export default function NoMatch() {
    return (
        <EmptyState description="Nothing to see here!" Icon={NoMatchIcon}>
            <Link to="/">Go to the app</Link>
        </EmptyState>
    );
}
