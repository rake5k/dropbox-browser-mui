import _ from 'lodash';

export const SEARCH_KEY = 'f';

export const getSearchQuery = (params: URLSearchParams): string =>
    params.get(SEARCH_KEY) || '';

export const isSearchQueryEmpty = (params: URLSearchParams): boolean =>
    _.isEmpty(getSearchQuery(params));
