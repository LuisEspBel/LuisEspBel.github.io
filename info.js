

getShrimpData()
let int = setInterval(getShrimpData, 10000)


async function getShrimpData(){
    // Specify the API endpoint
    const url = 'http://localhost:5119/api/ShrimpData/latest';

    // Make the POST request using fetch
    fetch(url, {
        method: 'GET', // Use the POST method
        headers: {
            'Content-Type': 'application/json' // Set the content type to JSON
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {

        var temp = document.getElementById('temp');
        var ph = document.getElementById('ph');
        var ox = document.getElementById('ox');

        temp.setAttribute('data-target', data.temperatura.toFixed(2));
        ph.setAttribute('data-target', data.pH.toFixed(2));
        ox.setAttribute('data-target', data.oxigeno.toFixed(2));

        console.log(data);
    })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
