const omdbData = {
    url: 'http://www.omdbapi.com/',
    apikey: '20b79249'
}

const fetchData = async (searchTerm) => {
    const response = await axios.get(omdbData.url, {
        params: {
            apikey: omdbData.apikey,
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
}

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
    </div>
    </div>
    <div id="target"></div>
`;

const input = document.querySelector('.input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const showDropdown = () => {
    dropdown.classList.add('is-active');
}
const hideDropdown = () => {
    dropdown.classList.remove('is-active');
}


const onInput = async event => {
    const movies = await fetchData(event.target.value);
    if (!movies.length) {
        hideDropdown();
        return;
    }

    resultsWrapper.innerHTML = '';
    showDropdown();
    for (let movie of movies) {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;
        option.addEventListener('click', () => {
            hideDropdown();
            input.value = movie.Title;
            onMovieSelect(movie);
        });
        resultsWrapper.appendChild(option);
    }
}

input.addEventListener('input', debounce(onInput, 500));
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        hideDropdown();
    }
});

const onMovieSelect = async movie => {
    const response = await axios.get(omdbData.url, {
        params: {
            apikey: omdbData.apikey,
            i: movie.imdbID
        }
    })

    console.log(response.data);
}