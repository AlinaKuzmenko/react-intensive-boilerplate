export const getUniqueID = (length) => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

export const getMovies = async (context, pagesNumber) => {
    const { api, discoverMovie, key } = context;
    const movies = [];
    const urls = [];
    for (let page = 1; page < pagesNumber; page++) {
        urls.push(`${api}/${discoverMovie}page=1&${key}`, `${api}/${discoverMovie}page=2&${key}`);
    }
    const pAll = urls.map((url) => {
        const promise = fetch(url, {
            method: 'GET'
        }).then((response) => {
            return response;
        });

        return promise;
    });

    await Promise.all(pAll).then(async (responses) => {
        for (let response of responses) {
            const { results } = await response.json();

            movies.push(...results);
        }
    });

    return movies;
};
