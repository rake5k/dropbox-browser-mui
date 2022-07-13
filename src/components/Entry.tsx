import {
    Avatar,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { lightGreen, lime } from '@mui/material/colors';
import { Folder, InsertDriveFile as File } from '@mui/icons-material';
import moment from 'moment';
import React, { forwardRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Entry as DbEntry } from 'types';
import { appendParam } from 'utils/SearchParams';

interface Props extends DbEntry {
    date?: string;
}

export default function Entry(props: Props) {
    const avatarTypes = {
        file: {
            icon: <File />,
            style: { backgroundColor: lightGreen[600] },
        },
        folder: {
            icon: <Folder />,
            style: { backgroundColor: lime[700] },
        },
    };

    const EntryLink = forwardRef(
        (itemProps, ref: React.Ref<HTMLAnchorElement>) => {
            const [searchParams] = useSearchParams();
            if (props.type === 'file') {
                const params = appendParam(searchParams, 'f', props.path);
                return <Link to={`?${params}`} ref={ref} {...itemProps} />;
            } else {
                return (
                    <Link
                        to={`/browse${props.path}`}
                        ref={ref}
                        {...itemProps}
                    />
                );
            }
        },
    );

    return (
        <ListItemButton
            component={EntryLink}
            ref={React.useRef<HTMLAnchorElement>(null)}
        >
            <ListItemAvatar>
                <Avatar sx={avatarTypes[props.type].style}>
                    {avatarTypes[props.type].icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={props.date && moment(props.date).format('LLL')}
            />
        </ListItemButton>
    );
}
