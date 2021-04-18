const baseURL = "http://localhost:3000/api/v1/cars"

document.addEventListener('DOMContentLoaded', () => {
    // fetch and load cars
    getCars()

    // listen for submit event on form and handle data
    const createCarForm = document.querySelector("#create-car-form")
    createCarForm.addEventListener("submit", (e) => car.createCarForm(e))

     // listen for the submit event of the edit form and handle the data
    
    document.querySelector('#update-car').addEventListener('submit', e => car.saveUpdatedCar(e))
})


function getCars() {
    // get request and renders cars
    fetch(baseURL)
    .then(response => response.json())
    .then(cars => {
        cars.data.forEach(car => {
            //accessing the attributes of each individual object. and manipulating the DOM
            let newCar = new Car(car, car.attributes)
            newCar.attachToDom()
            // dried up code, added the render call in the Car class file. 
        })
    })
}


function postFetch(car) {
    // build my body object outside of my
    const bodyData = {year, brand, model, price, image_url, user_id}

    fetch(baseURL, {
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
        
        document.querySelector("#car-container").innerHTML += newCar.renderCar()
    })
}


function patchCar(car) {
    let {year, brand, model, price, image_url, user_id} = car
    const carInfo = {year, brand, model, price, image_url, user_id}

    fetch(`${baseURL}/${car.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(carInfo),
    })
      .then(res => res.json())
      
      // our backend responds with the updated syllabus instance represented as JSON
      .then(json => {
          car.renderCar()
      })

}


