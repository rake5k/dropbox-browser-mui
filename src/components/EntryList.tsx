import { List } from '@mui/material';
import React, { useRef } from 'react';

import Entry from './Entry';
import * as types from '../types';

interface Props {
    entries: types.Entry[];
}

export default function EntryList({ entries }: Props) {
    const styles = {
        paddingBottom: '56px',
        paddingTop: '80px',
        width: '100%',
    };

    return (
        <List sx={styles} ref={useRef<HTMLUListElement>(null)}>
            {entries.map((entry, index) => (
                <Entry {...entry} key={index} />
            ))}
        </List>
    );
}
