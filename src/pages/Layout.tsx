import React from 'react';
import { Outlet } from 'react-router-dom';

import SimpleAppBar from '../components/SimpleAppBar';
import ViewerDialog from '../components/ViewerDialog';

export default function Layout() {
    return (
        <div>
            <SimpleAppBar
                title={process.env.REACT_APP_TITLE || 'Untitled App'}
            />
            <Outlet />
            <ViewerDialog />
        </div>
    );
}
