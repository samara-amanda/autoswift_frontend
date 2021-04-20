const url = "http://localhost:3000/api/v1/cars" 

const container = document.querySelector("#car-container")
const createCarForm = document.querySelector('#create-car-form')


createCarForm.addEventListener('submit', (event) => createCarHandler(event)) 

function getCarsReq() {
    // get request and renders cars
    fetch(url)
    .then(response => response.json())
    .then(cars => {
        cars.data.forEach(car => {
            //accessing the attributes of each individual object. and manipulating the DOM
            const newCar = new Car(car, car.attributes)
            newCar.attachToDom()
            // dried up code, added the render call in the Car class file. 
        })
    })
}


function postCarReq(year, brand, model, price, image_url, user_id) {
    const carInputValues = {year, brand, model, price, image_url, user_id}

    // POST Render Car Request
    fetch(url, {
        // POST request.. sends back the object to the API 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(carInputValues)
    })
      .then(response => response.json())
      .then(car => {
          debugger
        const carData = car.data
        
        // render JSON response
        
        let newCar = new Car(carData, carData.attributes)
        
        
        newCar.attachToDom()
    })
}


function patchCarReq(car) {
    let {year, brand, model, price, image_url, user} = car
    const carInfo = {year, brand, model, price, image_url, user}

    fetch(`${url}/${car.id}`, {
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


function deleteCar(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
        .then(r => r.json())
        .then(json => alert(json.message))
}

getCarsReq()  

