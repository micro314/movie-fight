const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '20b79249',
            s: 'avengers'
        }
    });

    console.log(response.data);
}