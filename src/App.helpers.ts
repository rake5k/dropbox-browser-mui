import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import * as types from './common/types';

const dbx = new Dropbox({
    accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN,
    fetch,
} as any); // Quick fix for: https://github.com/dropbox/dropbox-sdk-js/issues/221

export async function loadEntries(path: string): Promise<types.Entry[]> {
    return dbx
        .filesListFolder({ path: path === '/' ? '' : path })
        .then(res =>
            orderEntries(
                res.entries
                    .filter(entry => entry['.tag'] !== 'deleted')
                    .map(normalizeEntry),
            ),
        );
}

export async function loadFile(path: string): Promise<types.File> {
    return dbx.filesGetTemporaryLink({ path }).then(res => ({
        name: res.metadata.name,
        link: res.link,
    }));
}

export async function loadEntryType(
    path: string,
): Promise<types.EntryType | 'deleted'> {
    if (path === '' || path === '/') {
        return 'folder';
    }

    return dbx.filesGetMetadata({ path }).then(res => res['.tag']);
}

export async function search(query: string): Promise<types.Entry[]> {
    return dbx
        .filesSearch({
            path: '',
            query,
            // Searching file contents is only available for Dropbox Business accounts:
            // http://dropbox.github.io/dropbox-sdk-js/global.html#FilesSearchArg
            mode: { '.tag': 'filename_and_content' },
        })
        .then(res => {
            const entries = res.matches
                .filter(match => match.metadata['.tag'] !== 'deleted')
                .map(match => normalizeEntry(match.metadata));
            return orderEntries(entries);
        });
}

function orderEntries(entries: types.Entry[]): types.Entry[] {
    const folders = _(entries)
        .filter(entry => entry.type === 'folder')
        .sortBy(['name'])
        .value();
    const files = _(entries)
        .filter(entry => entry.type === 'file')
        .map(entry => ({
            ...entry,
            year: parseInt(entry.name.split(' - ')[0], 10),
        }))
        .orderBy(['year', 'name'], ['desc', 'asc'])
        .value();

    return [...folders, ...files];
}

function normalizeEntry(
    entry: DropboxTypes.files.MetadataReference,
): types.Entry {
    switch (entry['.tag']) {
        case 'file':
            return normalizeEntryFile(
                entry as DropboxTypes.files.FileMetadataReference,
            );
        case 'folder':
            return normalizeEntryFolder(
                entry as DropboxTypes.files.FolderMetadataReference,
            );
        default:
            throw new TypeError(
                `Entry of type '${
                    entry['.tag']
                }' received, expected 'file'|'folder'.`,
            );
    }
}

function normalizeEntryFile(
    entry: DropboxTypes.files.FileMetadataReference,
): types.FileEntry {
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
): types.FolderEntry {
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
