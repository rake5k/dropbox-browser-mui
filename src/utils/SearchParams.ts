export const appendParam = (
    original: URLSearchParams,
    name: string,
    value: string,
): URLSearchParams => {
    const copy = new URLSearchParams(original);
    copy.append(name, value);
    return copy;
};

export const deleteParam = (original: URLSearchParams, name: string) => {
    const copy = new URLSearchParams(original);
    copy.delete(name);
    return copy;
};
