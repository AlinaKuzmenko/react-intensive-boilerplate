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
    // ${api}/${discoverMovie}page=${page}&${key}
    const { api, discoverMovie, key } = context;
    const movies = [];
    const urls = [`${api}/${discoverMovie}page=1&${key}`, `${api}/${discoverMovie}page=2&${key}`];
    console.log('urls', urls);
    
    const pAll = urls.map((url) => {
        const promise = fetch(url, {
            method: 'GET'
        }).then((response) => {
            return response;
        });
        
        return promise;
    });
    
    console.log('pAll', pAll);
    
    await Promise.all(pAll).then(async (responses) => {
        
        for (let response of responses) {
            const value = await response.json();
            
            movies.push(...value.results);
        }
    });
    
    return movies;
};
