export const getCookieScopeDomain = (domain: string = ''): string[] => {
    if (!domain) return [];
    domain = domain.replace(/^\.+/ig, '');
    const parts = domain.split('.');
    const scopes = parts.map((_, i) => '.' + parts.slice(i).join('.'));
    return [domain].concat(scopes);
}

export const normalizeDomain = (domain = '') => {
    return domain.replace(/^(\.*)?(?=\S)/ig, '.')
}