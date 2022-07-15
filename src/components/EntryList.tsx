import { List, SxProps, Theme } from '@mui/material';
import React, { memo, useRef } from 'react';

import Entry from 'components/Entry';
import { Entry as DbEntry } from 'types';

interface Props {
    entries: DbEntry[];
    sx?: SxProps<Theme>;
}

export default memo(function EntryList({ entries, sx = [] }: Props) {
    const styles = [
        {
            paddingTop: 8,
            width: '100%',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
    ];

    return (
        <List sx={styles} ref={useRef<HTMLUListElement>(null)}>
            {entries.map((entry, index) => (
                <Entry {...entry} key={index} />
            ))}
        </List>
    );
});
