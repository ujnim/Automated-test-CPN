export function removeSlashUrl(url: string): string {
    return url.endsWith('/') ? url.slice(0, -1) : url;
}

module.exports = {
    removeSlashUrl
}