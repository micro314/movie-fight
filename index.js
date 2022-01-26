const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '20b79249',
            s: searchTerm
        }
    });

    console.log(response.data);
}

const input = document.querySelector('input');
input.addEventListener('input', (event) => {
    fetchData(event.target.value);
});