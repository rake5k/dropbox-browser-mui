import DropboxTypes, { Dropbox } from 'dropbox';
import _ from 'lodash';

import { Entry, EntryType, File, FileEntry, FolderEntry } from 'types';

const dbx = new Dropbox({
    accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN,
});

export async function loadEntries(path: string): Promise<Entry[]> {
    return dbx
        .filesListFolder({ path })
        .then((res) =>
            orderEntries(
                res.result.entries
                    .filter((entry) => entry['.tag'] !== 'deleted')
                    .map(normalizeEntry),
            ),
        );
}

export async function loadFile(path: string): Promise<File> {
    return dbx.filesGetTemporaryLink({ path }).then((res) => ({
        name: res.result.metadata.name,
        link: res.result.link,
    }));
}

export async function loadEntryType(
    path: string,
): Promise<EntryType | 'deleted'> {
    if (path === '' || path === '/') {
        return 'folder';
    }

    return dbx.filesGetMetadata({ path }).then((res) => res.result['.tag']);
}

export async function search(query: string): Promise<Entry[]> {
    return dbx
        .filesSearchV2({
            query,
            options: {
                path: '',
            },
        })
        .then((res) => {
            const entries = res.result.matches
                .map((match) => match.metadata)
                .filter((match) => match['.tag'] === 'metadata')
                .map((match) => match as DropboxTypes.files.MetadataV2Metadata)
                .filter((match) => match.metadata['.tag'] !== 'deleted')
                .map((match) => normalizeEntry(match.metadata));
            return orderEntries(entries);
        });
}

function orderEntries(entries: Entry[]): Entry[] {
    const folders = _(entries)
        .filter((entry) => entry.type === 'folder')
        .sortBy(['name'])
        .value();
    const files = _(entries)
        .filter((entry) => entry.type === 'file')
        .map((entry) => ({
            ...entry,
            year: parseInt(entry.name.split(' - ')[0], 10),
        }))
        .orderBy(['year', 'name'], ['desc', 'asc'])
        .value();

    return [...folders, ...files];
}

function normalizeEntry(
    entry:
        | DropboxTypes.files.FileMetadataReference
        | DropboxTypes.files.FolderMetadataReference
        | DropboxTypes.files.DeletedMetadataReference,
): Entry {
    switch (entry['.tag']) {
        case 'file':
            return normalizeEntryFile(entry);
        case 'folder':
            return normalizeEntryFolder(entry);
        default:
            throw new TypeError(
                `Entry of type '${entry['.tag']}' received, expected 'file'|'folder'.`,
            );
    }
}

function normalizeEntryFile(
    entry: DropboxTypes.files.FileMetadataReference,
): FileEntry {
    if (!entry.path_display) {
        throw new Error(
            `Required property 'path_display' of entry is not set: ${entry}`,
        );
    }

    return {
        date: entry.client_modified,
        name: entry.name,
        path: entry.path_display,
        type: entry['.tag'],
    };
}

function normalizeEntryFolder(
    entry: DropboxTypes.files.FolderMetadataReference,
): FolderEntry {
    if (!entry.path_display) {
        throw new Error(
            `Required property 'path_display' of entry is not set: ${entry}`,
        );
    }

    return {
        name: entry.name,
        path: entry.path_display,
        type: entry['.tag'],
    };
}
