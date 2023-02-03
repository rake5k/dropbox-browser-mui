import {
    Avatar,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { lightGreen } from '@mui/material/colors';
import { InsertDriveFile as File } from '@mui/icons-material';
import moment from 'moment';
import React, { forwardRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { FileEntry} from 'types';
import { appendParam } from 'utils/SearchParams';

export default function FileEntry(props: FileEntry) {
    const avatar = {
        icon: <File />,
        style: { backgroundColor: lightGreen[600] },
    };

    const EntryLink = forwardRef(
        (itemProps, ref: React.Ref<HTMLAnchorElement>) => {
            const [searchParams] = useSearchParams();
            const params = appendParam(searchParams, 'f', props.path);
            return <Link to={`?${params}`} ref={ref} {...itemProps} />;
        }
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
            <ListItemText
                primary={props.name}
                secondary={props.date && moment(props.date).format('LLL')}
            />
        </ListItemButton>
    );
}
