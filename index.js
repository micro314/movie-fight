const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '20b79249',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
}

const onInput = async event => {
    if (event.target.value) {
        const movies = await fetchData(event.target.value);
        for (let movie of movies) {
            const div = document.createElement('div');

            div.innerHTML = `
                <img src="${movie.Poster}" />
                <h1>${movie.Title}</h1>
            `;
            document.querySelector('#target').appendChild(div);
        }
    }
}

const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput, 500));