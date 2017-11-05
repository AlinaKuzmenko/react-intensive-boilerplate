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
    const urls = [...new Array(pagesNumber).keys()].map((index) => `${api}/${discoverMovie}page=${index+1}&${key}`);
    console.log(urls);
    const pAll = urls.map((url) => {
        const promise = fetch(url, {
            method: 'GET'
        }).then((response) => response);

        return promise;
    });

    await Promise.all(pAll).then((responses) => {
        responses.map(async (response) => {
            const { results } = await response.json();

            movies.push(...results);
        });
    });
    
    console.log('movies', movies);
    return movies;
};
