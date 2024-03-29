import React from 'react';
import { Outlet } from 'react-router-dom';

import SimpleAppBar from 'components/SimpleAppBar';
import ViewerDialog from 'components/ViewerDialog';

export default function Layout() {
    return (
        <>
            <SimpleAppBar
                title={import.meta.env.VITE_APP_TITLE || 'Untitled App'}
            />
            <Outlet />
            <ViewerDialog />
        </>
    );
}
