class CarApi {
    static getCarsReq() {
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


    static postCarReq(year, brand, model, price, user_id, image_url) {
        const carInputValues = {year, brand, model, price, user_id, image_url}

        // POST Render Car Request
        fetch(url, {
        // POST request.. sends back the object to the API 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(carInputValues)
        })
        .then(response => response.json())
        .then(car => {
            const carData = car.data
            // render JSON response
            let newCar = new Car(carData, carData.attributes)
        
            newCar.attachToDom()
        })
    }


    static patchCarReq(car) {
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


    static deleteCar(id) {
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
}