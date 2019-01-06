export type EntryType = 'file' | 'folder';

export interface Entry {
    readonly name: string;
    readonly path: string;
    readonly type: EntryType;
}

export interface FileEntry extends Entry {
    readonly date: DropboxTypes.common.Date;
}

export interface FolderEntry extends Entry {}

export interface File {
    readonly name: string;
    readonly link: string;
}
