class CarApi {


    static getCars() {
        // get request and renders cars
        fetch(baseURL)
        .then(response => response.json())
        .then(cars => {
            cars["data"].forEach(car => {
                //accessing the attributes of each individual object. and manipulating the DOM
                const newCar = new Car(car, car.attributes)
                newCar.attachToDom()
                // dried up code, added the render call in the Car class file. 
            })
        })
    }


    static createCar() {
        // POST Render Car Request
        const formData = {
            year: yearInput.value,
            brand: brandInput.value,
            model: modelInput.value, 
            price: priceInput.value,
            image_url: imageUrlInput.value, 
            user_id: userInput.value
        }
        
        fetch(baseURL, {
            // POST request.. sends back the object to the API 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
          .then(response => response.json())
          .then(car => {
            const carData = car.data
            
            // render JSON response
            let newCar = new Car(carData, carData.attributes)
            
            
            newCar.attachToDom()
        })
    }

    static patchCar(car) {
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


    static deleteCar(id) {
        fetch(`${baseURL}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(r => r.json())
            .then(json => alert(json.message))
            
    }



}