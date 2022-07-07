import _ from 'lodash';

export const getSearchQuery = (params: URLSearchParams): string =>
    params.get('search') || '';

export const isSearchActive = (params: URLSearchParams): boolean =>
    params.has('search');

export const isSearchQueryEmpty = (params: URLSearchParams): boolean =>
    _.isEmpty(getSearchQuery(params));
