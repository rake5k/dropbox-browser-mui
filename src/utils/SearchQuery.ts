export default class SearchQuery {
    private readonly _searchKey: string;

    constructor(searchKey: string) {
        this._searchKey = searchKey;
    }

    get = (params: URLSearchParams): string =>
        params.get(this._searchKey) || '';
}
