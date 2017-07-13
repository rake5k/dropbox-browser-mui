import React from 'react';

import Entry from './Entry';

function EntryList({ entries, onFileClick, onFolderClick }) {
    if (!entries) {
        return <p>loading...</p>;
    }

    if (!entries.length) {
        return <p>...empty</p>;
    }

    return (
        <ul>
            {entries.map((entry, index) => (
                <Entry
                    {...entry}
                    key={index}
                    onFileClick={onFileClick}
                    onFolderClick={onFolderClick}
                />
            ))}
        </ul>
    )
}

export default EntryList;
