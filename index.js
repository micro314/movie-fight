const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '20b79249',
            s: searchTerm
        }
    });

    console.log(response.data);
}

const onInput = event => {
    if (event.target.value) {
        fetchData(event.target.value);
    }
}

const input = document.querySelector('input');
input.addEventListener('input', debounce(onInput, 500));