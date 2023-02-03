import {
    Avatar,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { lime } from '@mui/material/colors';
import { Folder } from '@mui/icons-material';
import React, { forwardRef } from 'react';
import { Link} from 'react-router-dom';

import { FolderEntry} from 'types';

export default function Entry(props: FolderEntry) {
    const avatar = {
        icon: <Folder />,
        style: { backgroundColor: lime[700] },
    };

    const EntryLink = forwardRef(
        (itemProps: FolderEntry, ref: React.Ref<HTMLAnchorElement>) => {
            return (
                <Link
                    to={`/browse${itemProps.path}`}
                    ref={ref}
                    {...itemProps}
                />
            );
        },
    );
    EntryLink.displayName = 'EntryLink';

    return (
        <ListItemButton
            component={EntryLink}
            ref={React.useRef<HTMLAnchorElement>(null)}
        >
            <ListItemAvatar>
                <Avatar sx={avatar.style}>
                    {avatar.icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.name}/>
        </ListItemButton>
    );
}
