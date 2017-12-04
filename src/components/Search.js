import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchButton from './SearchButton';
import SearchDrawer from './SearchDrawer';

export default function Search(props) {
    const { onSearch } = props;

    const params = new URLSearchParams(props.location.search);
    const isActive = params.has('search');
    isActive ? params.delete('search') : params.append('search', '');
    const to = params.toString()
        ? props.location.pathname + '?' + params.toString()
        : props.location.pathname;

    return (
        <div>
            <SearchButton isActive={isActive} component={Link} to={to} />
            <SearchDrawer isOpen={isActive} onSearch={onSearch} />
        </div>
    );
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
