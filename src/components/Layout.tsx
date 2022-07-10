import React from 'react';
import { Outlet } from 'react-router-dom';

import SimpleAppBar from './SimpleAppBar';
import ViewerDialog from './ViewerDialog';

export default function Layout(): JSX.Element {
    return (
        <div>
            <SimpleAppBar title={process.env.REACT_APP_TITLE} />
            <Outlet />
            <ViewerDialog />
        </div>
    );
}
