const endPoint = "http://localhost:3000/api/v1/cars"

document.addEventListener('DOMContentLoaded', () => {
    getCars()

    const createCarForm = document.querySelector("#create-car-form")

    createCarForm.addEventListener("submit", (e) => createFormHandler(e))
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
                <p>Contact Info: ${car.attributes.user.name}</p>
                <p> ${car.attributes.user.email}</p>

                <button>Edit</button>
                <br><br>
            </div>`;

            document.querySelector('#car-container').innerHTML += carMarkup
        })
    })
}

function createFormHandler(e) {
    e.preventDefault()
    const yearInput = document.querySelector("#input-year").value
    const brandInput = document.querySelector("#input-brand").value
    const modelInput = document.querySelector("#input-model").value
    const priceInput = document.querySelector("#input-price").value
    const imageInput = document.querySelector("#input-image-url").value
    const userInput = document.querySelector("#users").value

    postFetch(yearInput, brandInput, modelInput, priceInput, imageInput, userInput)
}

function postFetch(year, brand, model, price, image_url, user_id) {

    const bodyData = {year, brand, model, price, image_url, user_id}

     fetch(endPoint, {
        // POST request.. sends back the object to the API 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
      })
      .then(response => response.json())
      .then(car => {
        const carData = car.data.attributes
        // render JSON response
        const carMarkup = `
        <div data-id=${car.id}>

          <img src=${carData.image_url} height="200" width="250">

          <h3>${carData.year} ${carData.brand} ${carData.model}</h3>

          <p>${"$" + carData.price}</p>

          <p>Contact Info: ${carData.user.name} </p>

          <p> ${carData.user.email}</p>

          <button data-id=${carData.id}>edit</button>
        </div>
        <br><br>`;

        document.querySelector('#car-container').innerHTML +=  carMarkup;
      })
}