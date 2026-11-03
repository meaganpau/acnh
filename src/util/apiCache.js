// Keeps API responses in memory so switching pages doesn't refetch.
// Cleared on page reload.
const cache = {};

export const getCached = (url) => cache[url] && cache[url].data;

// Fetches each URL once. Failed requests aren't cached, so they retry.
export const fetchCached = (url) => {
    if (!cache[url]) {
        const entry = {};
        entry.promise = fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Something went wrong...');
            })
            .then((data) => {
                entry.data = data;
                return data;
            })
            .catch((err) => {
                delete cache[url];
                throw err;
            });
        cache[url] = entry;
    }
    return cache[url].promise;
};
