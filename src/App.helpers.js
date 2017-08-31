import Dropbox from 'dropbox';
import _ from 'lodash';

const dbx = new Dropbox({
    accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN,
});

export async function loadEntries(path) {
    try {
        const { entries } = await dbx.filesListFolder({ path });
        const normalized = _.map(entries, entry => ({
            name: entry.name,
            path: entry.path_display,
            type: entry['.tag'],
        }));
        return orderEntries(normalized);
    } catch (error) {
        console.log(error);
    }
}

export async function loadFileLink(path) {
    try {
        return dbx.filesGetTemporaryLink({ path });
    } catch (error) {
        console.log(error);
    }
}

export async function searchFiles(query) {
    try {
        const { matches } = await dbx.filesSearch({
            path: '',
            query,
            // Searching file contents is only available for Dropbox Business accounts:
            // http://dropbox.github.io/dropbox-sdk-js/global.html#FilesSearchArg
            mode: { '.tag': 'filename_and_content' },
        });
        const normalized = _.map(matches, match => ({
            name: match.metadata.name,
            path: match.metadata.path_display,
            type: match.metadata['.tag'],
        }));
        return orderEntries(normalized);
    } catch (error) {
        console.log(error);
    }
}

function orderEntries(entries) {
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
