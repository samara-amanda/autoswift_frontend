const endPoint = "http://localhost:3000/api/v1/cars"

document.addEventListener('DOMContentLoaded', () => {
    // fetch and load cars
    getCars()
    const createCarForm = document.querySelector("#create-car-form")

    createCarForm.addEventListener("submit", (e) => createFormHandler(e))
})


function getCars() {
    // get request
    fetch(endPoint)
    .then(response => response.json())
    .then(cars => {
        cars.data.forEach(car => {
            //accessing the attributes of each individual object. and manipulating the DOM
            let newCar = new Car(car, car.attributes)
            document.querySelector("#car-container").innerHTML += newCar.renderCarCard()
            // dried up code, added the render call in the Car class file. 
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
    // build my body object outside of my
    const bodyData = {year, brand, model, price, image_url, user_id}

    fetch(endPoint, {
        // POST request.. sends back the object to the API 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
      .then(response => response.json())
      .then(car => {
        const carData = car.data
        // render JSON response
        let newCar = new Car(carData, carData.attributes)
        
        document.querySelector("#car-container").innerHTML += newCar.renderCarCard()
    })
}

