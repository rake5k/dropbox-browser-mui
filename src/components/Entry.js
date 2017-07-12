import _ from 'lodash';
import React from 'react';

function Entry(props) {
    const { name, path, type } = props;
    const onClick = props[`on${_.upperFirst(type)}Click`];

    return (
        <li onClick={() => onClick(path)}>{name}</li>
    );
}

export default Entry;
