const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '20b79249',
            s: searchTerm
        }
    });

    console.log(response.data);
}

const debounce = (callback, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
}

const onInput = event => {
    if (event.target.value) {
        fetchData(event.target.value);
    }
}

const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput, 500));