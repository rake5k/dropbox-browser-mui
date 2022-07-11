import _ from 'lodash';

export default class SearchQuery {
    private readonly _searchKey: string;

    constructor(searchKey: string) {
        this._searchKey = searchKey;
    }

    get = (params: URLSearchParams): string =>
        params.get(this._searchKey) || '';

    isEmpty = (params: URLSearchParams): boolean => _.isEmpty(this.get(params));
}
