import PropTypes from 'prop-types';
import React from 'react';

import SearchButton from './SearchButton';
import SearchDrawer from './SearchDrawer';

export default function Search(props) {
    const { isActive, onSearch, onToggle } = props;

    return (
        <div>
            <SearchButton isActive={isActive} onClick={onToggle} />
            <SearchDrawer
                isOpen={isActive}
                onClose={onToggle}
                onSearch={onSearch}
            />
        </div>
    );
}

Search.propTypes = {
    isActive: PropTypes.bool,
    onSearch: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
};
