import DropboxTypes from 'dropbox';

export type EntryType = 'file' | 'folder';

export interface Entry {
    name: string;
    path: string;
    type: EntryType;
}

export interface FileEntry extends Entry {
    date: DropboxTypes.common.Date;
}

export type FolderEntry = Entry;

export interface File {
    name: string;
    link: string;
}
