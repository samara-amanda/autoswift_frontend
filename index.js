const endPoint = "http://localhost:3000/api/v1/cars"

document.addEventListener('DOMContentLoaded', () => {
    getCars()
})

function getCars() {
    fetch(endPoint)
    .then(response => response.json())
    .then(cars => {
        cars.data.forEach(car => {
            //accessing the attributes of each individual object.
            const carMarkup = `
            <div data-id=${car.id}>
                <img src=${car.attributes.image_url} height="250" width="350">
                
                <h2>${car.attributes.year} ${car.attributes.brand} ${car.attributes.model}</h2>

                <p> ${"$" + car.attributes.price} </p>

                <button>Edit</button>
                <br><br>
            </div>`;

            document.querySelector('#car-container').innerHTML += carMarkup
        })

    })

}