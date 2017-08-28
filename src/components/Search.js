import PropTypes from 'prop-types';
import React from 'react';

import SearchButton from './SearchButton';
import SearchDrawer from './SearchDrawer';

export default function Search(props) {
    const { isActive, onToggle } = props;

    return (
        <div>
            <SearchButton isActive={isActive} onClick={onToggle} />
            <SearchDrawer isOpen={isActive} onClose={onToggle} />
        </div>
    );
}

Search.propTypes = {
    isActive: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
};
