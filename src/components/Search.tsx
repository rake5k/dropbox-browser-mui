import { History, Location } from 'history';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import SearchButton from './SearchButton';
import SearchDrawer from './SearchDrawer';

interface SearchProps {
    readonly history: History;
    readonly location: Location;
}

export default function Search(props: SearchProps): JSX.Element {
    const params = new URLSearchParams(props.location.search);
    const isActive = params.has('search');
    const query = params.get('search');

    isActive ? params.delete('search') : params.append('search', '');
    const to = params.toString()
        ? props.location.pathname + '?' + params.toString()
        : props.location.pathname;

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
                onSearch={query => {
                    params.set('search', query);
                    props.history.replace({
                        search: params.toString(),
                    });
                }}
            />
        </div>
    );
}
