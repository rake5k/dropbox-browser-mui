import Dropbox from 'dropbox';
import _ from 'lodash';

const dbx = new Dropbox({ accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN });

export async function loadEntries(path) {
    if (!process.env.REACT_APP_DROPBOX_ACCESS_TOKEN) {
        throw new Error('Dropbox Access Token required');
    }

    try {
        const { entries } = await dbx.filesListFolder({ path });
        return _.map(entries, (entry) => ({
            name: entry.name,
            path: entry.path_display,
            type: entry['.tag']
        }));
    } catch (error) {
        console.log(error);
    }
}

export async function loadFileLink(path) {
    return dbx.filesGetTemporaryLink({ path });
}
