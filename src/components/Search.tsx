import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useLocation } from 'react-router-dom';

import SearchButton from './SearchButton';
import SearchDrawer from './SearchDrawer';

export default function Search(): JSX.Element {
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const isActive = params.has('search');
    const query = params.get('search');

    isActive ? params.delete('search') : params.append('search', '');
    const to = params.toString()
        ? location.pathname + '?' + params.toString()
        : location.pathname;

    const link = (itemProps: any): JSX.Element => (
        <Link to={to} {...itemProps} />
    );

    return (
        <div>
            {isActive && (
                <Helmet>
                    <title>
                        {query || 'Search'}
                        {' - '}
                        {process.env.REACT_APP_TITLE}
                    </title>
                </Helmet>
            )}
            <SearchButton isActive={isActive} component={link} />
            <SearchDrawer
                isOpen={isActive}
                onSearch={q => {
                    params.set('search', q);
                    history.replace({
                        search: params.toString(),
                    });
                }}
            />
        </div>
    );
}
