const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '20b79249',
            s: searchTerm
        }
    });

    console.log(response.data);
}

let timeoutId;
const onInput = (event) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value);
    }, 500);
};

const input = document.querySelector('input');
input.addEventListener('input', onInput);