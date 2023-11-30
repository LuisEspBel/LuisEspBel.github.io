getShrimpData()
let int = setInterval(getShrimpData, 300000)


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

        const counters = document.querySelectorAll('.counter')

        counters.forEach(counter =>
        {
            counter.classList.remove('updated');
            updateCounter(counter)
        })

        console.log(data);
    })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}


function updateCounter(counter){
    // Obtiene el valor objetivo desde el atributo 'data-target'
    const target = +counter.getAttribute('data-target');

    // Provoca un reflujo (reflow) forzando el navegador a reconocer el cambio de estilo
    void counter.offsetWidth;

    // Establece el nuevo valor
    setTimeout(() => {
        // Agrega la clase 'updated' para que la opacidad transicione a 1
        counter.innerText = target.toFixed(2);
    }, 1500); // Puedes probar con diferentes demoras si 0 no funciona correctamente
    

    // Utiliza setTimeout para darle tiempo al navegador de reconocer que se quitó la clase 'updated'
    setTimeout(() => {
        // Agrega la clase 'updated' para que la opacidad transicione a 1
        counter.classList.add('updated');
    }, 1500); // Puedes probar con diferentes demoras si 0 no funciona correctamente
}

// function updateCounter(counter){
//     const target = +counter.getAttribute('data-target');
//     const c = +counter.innerText;
//     const increment = target > 0 ? Math.ceil(target / 100) : 1; // Adjust increment based on target
    
//     if (c < target) {
//         counter.innerText = `${Math.ceil(c + increment)}`;
//         setTimeout(() => {
//             updateCounter(counter); // Pass the counter element again for the next increment
//         }, 10);
//     } else {
//         counter.innerText = target.toFixed(2); // Ensure the target is formatted correctly
//     }
// }